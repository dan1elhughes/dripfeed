import React from 'react';
import PropTypes from 'prop-types';
import bindMethods from 'yaab';
import Forecast from 'forecast-promise';

import moment from 'moment';

import Header from '../Header/Header';

import { StyledName, StyledSubText } from './OutTile.styles';

export default class OutTile extends React.Component {
	static get layout() {
		return { width: 1, height: 3 };
	}

	static get propTypes() {
		return {
			pollRate: PropTypes.number.isRequired,
			holidayId: PropTypes.number.isRequired,
		};
	}

	static get defaultProps() {
		return { pollRate: 60 * 30, holidayId: 1047482 };
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

		const { holidayId } = this.props;

		const startDate = new Date();
		const endDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);

		const [assignments, people] = await Promise.all([
			this.forecastInstance.assignments({ startDate, endDate }),
			this.forecastInstance.people(),
		]);

		const holidayAssignments = assignments.filter(
			_ => _.project_id === holidayId && _.person_id !== null
		);

		const lookup = new Map(people.map(({ id, ...rest }) => [id, rest]));

		const holidays = holidayAssignments
			.map(assignment => {
				const { start_date, end_date, person_id } = assignment;
				const { first_name, last_name } = lookup.get(person_id);

				const start = moment(start_date);
				const end = moment(end_date);

				const days = [];

				for (
					let day = moment(start);
					day.diff(end, 'days') <= 0;
					day.add(1, 'days')
				) {
					if (moment().diff(day, 'days') <= 0) {
						days.push(moment(day));
					}
				}

				return { name: `${first_name} ${last_name}`, days };
			})

			.sort((a, b) => a.days[0].diff(b.days[0], 'days'));

		this.setState({ holidays });
	}

	render() {
		const { holidays } = this.state;

		return (
			<div className="OutTile">
				<Header level={2} centered={true}>
					Holidays
				</Header>
				{holidays.length === 0 && (
					<Header level={3} centered={true}>
						No holidays found
					</Header>
				)}
				{holidays.map(({ name, days }) => (
					<div key={name + days[0].format('DD-MM-YYYY')}>
						<StyledName>{name}</StyledName>
						{days.map(day => (
							<StyledSubText key={day.format('DD-MM-YYYY')}>
								{day.format('ddd Do MMM')}
							</StyledSubText>
						))}
					</div>
				))}
			</div>
		);
	}
}
