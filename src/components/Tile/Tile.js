import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { color, radius, spacing } from '../../styles/tokens.json';

const StyledTile = styled.div`
	background: ${color.background.tile};
	padding: 1em;
	margin: ${spacing.large};
	border-radius: ${radius.large};
`;

const Tile = ({ component: Component, ...props }) => {
	return (
		<StyledTile width={Component.layout.width} height={Component.layout.height}>
			<Component {...props} />
		</StyledTile>
	);
};

Tile.propTypes = {
	component: PropTypes.func.isRequired,
};

export default Tile;
