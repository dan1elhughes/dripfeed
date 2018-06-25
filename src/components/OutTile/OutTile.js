import React from 'react';
import PropTypes from 'prop-types';
import bindMethods from 'yaab';
import Forecast from 'forecast-promise';

import moment from 'moment';

import Header from '../Header/Header';

import { StyledAvatar, StyledName, StyledSubText } from './OutTile.styles';

export default class OutTile extends React.Component {
	static get layout() {
		return { width: 2, height: 1 };
	}

	static get propTypes() {
		return { pollRate: PropTypes.number.isRequired };
	}

	static get defaultProps() {
		return { pollRate: 60 * 30 };
	}

	constructor(props) {
		super(props);

		this.state = {
			holidays: [],
		};
		bindMethods(this);
	}

	extractForecastSetting(settings) {
		const forecastSettings = settings.filter(_ => _.type === 'forecast');
		if (forecastSettings.length > 0) {
			return forecastSettings[0];
		}
	}

	componentDidMount() {
		const { pollRate } = this.props;
		this._interval = setInterval(this.fetchHolidayBookings, pollRate * 1000);
	}

	componentWillUnmount() {
		clearInterval(this._interval);
	}

	componentWillReceiveProps({ settings }) {
		const forecastSettings = this.extractForecastSetting(settings);
		if (forecastSettings) {
			const { username: accountId, password: token } = forecastSettings;

			this.forecastInstance = new Forecast({ accountId, token });

			this.fetchHolidayBookings();
		} else {
			this.setState({ holidays: [] });
		}
	}

	async fetchHolidayBookings() {
		if (!this.forecastInstance) return false;

		const startDate = new Date();
		const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

		const [assignments, people] = await Promise.all([
			this.forecastInstance.assignments({ startDate, endDate }),
			this.forecastInstance.people(),
		]);

		const holidayAssignments = assignments.filter(
			_ => _.project_id === 1047482 && _.person_id !== null
		);

		const lookup = new Map(people.map(({ id, ...rest }) => [id, rest]));

		const today = moment();

		const holidays = holidayAssignments
			.map(assignment => {
				const { start_date, end_date, person_id } = assignment;

				const { first_name, last_name, avatar_url } = lookup.get(person_id);

				return {
					starts: moment(start_date).diff(today, 'days'),
					ends: moment(end_date).diff(today, 'days'),
					mStarts: moment(start_date),
					mEnds: moment(end_date),
					name: `${first_name} ${last_name}`,
					avatarUrl: avatar_url,
				};
			})
			.sort((a, b) => a.starts - b.starts);

		this.setState({ holidays });
	}

	getHolidayText({ starts, mEnds }) {
		const days = d => (d > 1 ? 'days' : 'day');

		if (mEnds.diff(moment(), 'hours') <= 0) {
			return 'Back tomorrow';
		}

		if (starts > 0) {
			return `in ${starts + 1} ${days(starts + 1)}`;
		}

		// Add one day because they are back
		// on the day after the holiday ends
		return 'Back ' + mEnds.add(1, 'day').format('dddd');
	}

	render() {
		const { holidays } = this.state;

		const outToday = holidays.filter(holiday => holiday.starts <= 0);
		const outSoon = holidays.filter(holiday => holiday.starts > 0);
		return (
			<div className="OutTile">
				{holidays.length === 0 && (
					<Header level={2} centered={true}>
						No holidays found
					</Header>
				)}
				{outToday.length > 0 && (
					<Header level={2} centered={true}>
						Out today
					</Header>
				)}
				{outToday.map(holiday => (
					<div key={holiday.name + holiday.starts} style={{ clear: 'both' }}>
						<StyledAvatar src={holiday.avatarUrl} />
						<StyledName>{holiday.name}</StyledName>
						<StyledSubText>{this.getHolidayText(holiday)}</StyledSubText>
					</div>
				))}
				{outSoon.length > 0 && (
					<Header level={2} centered={true}>
						Out soon
					</Header>
				)}
				{outSoon.map(holiday => (
					<div key={holiday.name + holiday.starts} style={{ clear: 'both' }}>
						<StyledAvatar src={holiday.avatarUrl} />
						<StyledName>{holiday.name}</StyledName>
						<StyledSubText>{this.getHolidayText(holiday)}</StyledSubText>
					</div>
				))}
			</div>
		);
	}
}
