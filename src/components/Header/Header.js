import React from 'react';
import PropTypes from 'prop-types';

import createStyledHeader from './Header.styles';

const Header = props => {
	const Component = createStyledHeader(props.level);
	return <Component {...props} />;
};

Header.propTypes = {
	children: PropTypes.string,
	level: PropTypes.number.isRequired,
};

Header.defaultProps = {
	level: 1,
};

export default Header;
