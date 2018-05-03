import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDeleteTip = styled.span`
	opacity: 0;
	transition: opacity 0.25s;
	color: darkred;
	font-weight: bolder;
`;

const StyledAccount = styled.div`
	background: white;
	color: black;
	border-radius: 5px;
	padding: 1em;
	font-variant: small-caps;
	text-transform: lowercase;
	margin-bottom: 10px;
	transition: background 0.25s;
	cursor: pointer;
	&:hover {
		background: ${props => (props.active ? '#ff6666' : 'grey')};

		${StyledDeleteTip} {
			opacity: ${props => (props.active ? '1' : '0')};
		}
	}
`;

const Account = ({ type, name, onClick }) => (
	<div className="Account">
		<StyledAccount onClick={onClick} active={!!name}>
			{name || `Connect ${type}`} <StyledDeleteTip>X</StyledDeleteTip>
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
