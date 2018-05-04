import React from 'react';
import PropTypes from 'prop-types';
import bindMethods from 'yaab';
import styled from 'styled-components';
import Weather from '../../api/Weather';

import { color } from '../../styles/tokens.json';

const base = 'https://query.yahooapis.com';
const weather = new Weather({ base });

const StyledOfficeName = styled.p`
	text-transform: uppercase;
	color: ${props =>
		props.isWorkingHours ? color.text.positive : color.text.negative};
`;

const StyledLocalTime = styled.h3`
	color: ${color.text.strong};
	font-weight: normal;
`;

const StyledWeather = styled.p`
	color: ${color.text.dim};
`;

export default class LocationTile extends React.Component {
	static get propTypes() {
		return {
			office: PropTypes.shape({
				name: PropTypes.string.isRequired,
				woeId: PropTypes.number.isRequired,
				locale: PropTypes.string.isRequired,
			}).isRequired,
			pollRate: PropTypes.number.isRequired,
		};
	}

	static get defaultProps() {
		return { pollRate: 300 };
	}

	static get initialState() {
		return {
			weather: '...',
			temperature: '...',
		};
	}

	static get layout() {
		return {
			width: 1,
			height: 1,
		};
	}

	constructor(props) {
		super(props);
		this.state = LocationTile.initialState;
		bindMethods(this);
	}

	componentDidMount() {
		const { pollRate } = this.props;

		this.checkWeather();

		this._poll = setInterval(this.checkWeather, pollRate * 1000);
		this._tick = setInterval(this.forceUpdate.bind(this), 1000);
	}

	componentWillUnmount() {
		clearInterval(this._poll);
		clearInterval(this._tick);
	}

	async checkWeather() {
		const condition = await weather.getAt(this.props.office.woeId);

		const temperature = condition.temp;
		const iconClass = `wi wi-yahoo-${condition.code}`;

		this.setState({
			temperature,
			iconClass,
		});
	}

	getLocalTime() {
		return new Date().toLocaleTimeString('en-GB', {
			timeZone: this.props.office.locale,
			hour: '2-digit',
			minute: '2-digit',
		});
	}

	// TODO: Include weekends in this calculation.
	isWorkingHours() {
		const [_hours, _minutes] = this.getLocalTime().split(':');

		let hours = Number(_hours);
		const minutes = Number(_minutes);

		hours += minutes / 60;

		return hours > 9 && hours < 17.5;
	}

	render() {
		return (
			<div className="LocationTile">
				<StyledLocalTime>{this.getLocalTime()}</StyledLocalTime>
				<StyledWeather>
					{this.state.temperature}°
					<i className={this.state.iconClass} />
				</StyledWeather>
				<StyledOfficeName isWorkingHours={this.isWorkingHours()}>
					{this.props.office.name}
				</StyledOfficeName>
			</div>
		);
	}
}
