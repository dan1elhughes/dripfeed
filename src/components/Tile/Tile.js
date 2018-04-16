import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colour, grid } from '../../styles/variables';

const StyledTile = styled.div`
	background: ${colour.background.tile};
	padding: 1em;
	flex: ${props => props.width};
	margin: ${grid.gutter}px;
	width: 25%;
`;

const Tile = ({ component: Component, ...props }) => (
	<StyledTile
		className="Tile"
		width={Component.layout.width}
		height={Component.layout.height}
	>
		<Component {...props} />
	</StyledTile>
);

Tile.propTypes = {
	component: PropTypes.func.isRequired,
};

export default Tile;
