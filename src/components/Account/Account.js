import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { color, spacing } from '../../styles/tokens.json';

import JiraLogo from './assets/logo-jira.png';
import BitbucketLogo from './assets/logo-bitbucket.png';
import ForecastLogo from './assets/logo-forecast.png';

const StyledTip = styled.span`
	color: rgba(0, 0, 0, 0.35);
	font-weight: bolder;
	position: absolute;
	top: 36%;
	transition: opacity 0.25s;
	right: ${spacing.small};
`;

const StyledAccount = styled.div`
	background: ${props => {
		if (props.type === 'jira') {
			return `url(${JiraLogo}) no-repeat 10px 50% #205081`;
		} else if (props.type === 'bitbucket') {
			return `url(${BitbucketLogo}) no-repeat 10px 50% #205081`;
		} else if (props.type === 'forecast') {
			return `url(${ForecastLogo}) no-repeat 10px 50% #f36c00`;
		}
	}}
	background-size: auto 34px;
	border-radius: 5px;
	color: #ffffff;
	cursor: pointer;
	font-size: 14px;
	margin-bottom: ${spacing.medium};
	padding: ${spacing.medium};
	position: relative;
	text-transform: uppercase;
	transition: background 0.25s, color 0.25s;

	${StyledTip} {
		opacity: 0;
	}

	&:hover {
		background-color: ${props => {
			if (props.active) {
				return '#ff6666';
			} else {
				return `${color.text.positive}`;
			}
		}};

		${StyledTip} {
			opacity: 1;
		}

	}
`;

const Account = ({ type, name, onClick }) => (
	<div className="Account">
		<StyledAccount onClick={onClick} active={!!name} type={type}>
			{name || `${type}`}
			<StyledTip active={!!name}>{name ? 'Remove' : 'Add'}</StyledTip>
		</StyledAccount>
	</div>
);

Account.propTypes = {
	type: PropTypes.oneOf(['jira', 'bitbucket', 'forecast']).isRequired,
	name: PropTypes.string,
	onClick: PropTypes.func.isRequired,
};

Account.defaultProps = {
	active: false,
};

export default Account;
