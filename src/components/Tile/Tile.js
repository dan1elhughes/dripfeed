import React from 'react';
import PropTypes from 'prop-types';

import { StyledTile } from './Tile.styles';

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
