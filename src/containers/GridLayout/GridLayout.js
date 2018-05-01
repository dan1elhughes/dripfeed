import React from 'react';
import PropTypes from 'prop-types';
import GridLayout from 'react-grid-layout';

import './GridLayout.css';

class MyFirstGrid extends React.Component {
	render() {
		// layout is an array of objects, see the demo for more complete usage
		var layout = [
			{ i: 'a', x: 0, y: 0, w: 1, h: 1, static: true },
			{ i: 'b', x: 1, y: 0, w: 1, h: 1 },
			{ i: 'c', x: 2, y: 0, w: 1, h: 1 },
			{ i: 'd', x: 3, y: 0, w: 1, h: 1 },
			{ i: 'e', x: 4, y: 0, w: 1, h: 1 },
			{ i: 'f', x: 5, y: 0, w: 1, h: 1 },
		];
		return (
			<GridLayout
				className="Gridayout"
				layout={layout}
				cols={6}
				rowHeight={100}
				width={3000}
			>
				<div className="GridItem" key="a">a</div>
				<div className="GridItem" key="b">b</div>
				<div className="GridItem" key="c">c</div>
				<div className="GridItem" key="d">d</div>
				<div className="GridItem" key="e">e</div>
				<div className="GridItem" key="f">f</div>
			</GridLayout>
		);
	}
}

export default MyFirstGrid;
