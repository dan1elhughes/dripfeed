import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colour } from '../../styles/variables';

const StyledTile = styled.div`
	background: ${colour.background.tile};
	padding: 1em;
	margin: 1em;
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
