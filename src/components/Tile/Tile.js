import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { color, radius } from '../../styles/tokens.json';

const StyledTile = styled.div`
	background: ${color.background.tile};
	border-radius: ${radius.large};
	grid-area: span ${props => props.height} / span ${props => props.width};
	overflow-y: auto;
	text-align: center;
`;

const Tile = ({ component: Component, ...props }) => {
	return (
		<StyledTile
			className="Tile"
			width={Component.layout.width}
			height={Component.layout.height}
		>
			<Component {...props} />
		</StyledTile>
	);
};

Tile.propTypes = {
	component: PropTypes.func.isRequired,
};

export default Tile;
