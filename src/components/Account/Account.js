import React from 'react';
import PropTypes from 'prop-types';

import { StyledTip, StyledAccount } from './Account.styles';

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
