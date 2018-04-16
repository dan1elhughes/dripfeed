import React from 'react';
import PropTypes from 'prop-types';
import bindMethods from 'yaab';
import styled from 'styled-components';
import Forecast from 'forecast-promise';
import moment from 'moment';

import auth from '../../auth.js';
import { colour } from '../../styles/variables';

const { accountId, token } = auth.find(({ type }) => type === 'forecast');

const forecast = new Forecast({
	accountId,
	token,
});

const StyledHeader = styled.h2`
	text-transform: uppercase;
	font-weight: normal;
	clear: both;
`;

const StyledAvatar = styled.img`
	width: 70px;
	height: auto;
	border-radius: 10px;
	float: left;
	margin-right: 20px;
	margin-bottom: 20px;
`;

const StyledName = styled.h3`
	margin-bottom: 0px;
`;

const StyledSubText = styled.p`
	margin-top: 0px;
	text-transform: uppercase;
	color: ${colour.detail};
`;

export default class OutTile extends React.Component {
	static get layout() {
		return { width: 1, height: 2 };
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

	componentDidMount() {
		this.fetchHolidayBookings();

		const { pollRate } = this.props;
		this._interval = setInterval(this.fetchHolidayBookings, pollRate * 1000);
	}

	componentWillUnmount() {
		clearInterval(this._interval);
	}

	async fetchHolidayBookings() {
		const startDate = new Date();
		const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

		const [assignments, people] = await Promise.all([
			forecast.assignments({ startDate, endDate }),
			forecast.people(),
		]);

		const holidayAssignments = assignments.filter(
			_ => _.project_id === 1047482
		);

		const peopleLookup = new Map(people.map(({ id, ...rest }) => [id, rest]));

		const today = moment();

		const holidays = holidayAssignments
			.map(assignment => {
				const { start_date, end_date } = assignment;
				const { first_name, last_name, avatar_url } = peopleLookup.get(
					assignment.person_id
				);

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

	getHolidayText({ starts, ends, mEnds }) {
		const days = d => (d > 1 ? 'days' : 'day');

		if (mEnds.diff(moment(), 'hours') <= 0) {
			return 'Back tomorrow';
		}

		if (starts > 0) {
			return `in ${starts} ${days(starts)}`;
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
				{outToday.length > 0 && <StyledHeader>Out today</StyledHeader>}
				{outToday.map(holiday => (
					<div key={holiday.name + holiday.starts} style={{ clear: 'both' }}>
						<StyledAvatar src={holiday.avatarUrl} />
						<StyledName>{holiday.name}</StyledName>
						<StyledSubText>{this.getHolidayText(holiday)}</StyledSubText>
					</div>
				))}
				{outSoon.length > 0 && <StyledHeader>Out soon</StyledHeader>}
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
