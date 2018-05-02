import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledAccount = styled.div`
	background: white;
	color: black;
	border-radius: 5px;
	padding: 1em;
	font-variant: small-caps;
	text-transform: lowercase;
	&:hover {
		background: grey;
	}
`;

const Account = ({ type, name, onClick }) => (
	<div className="Account">
		<StyledAccount onClick={onClick}>{name || `Connect ${type}`}</StyledAccount>
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
