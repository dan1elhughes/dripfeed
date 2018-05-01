import React from 'react';
import PropTypes from 'prop-types';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

import './ResponsiveGridLayout.css';

class MyResponsiveGrid extends React.Component {
	render() {
		// {lg: layout1, md: layout2, ...}
		var layouts = getLayoutsFromSomewhere();
		return (
			<ResponsiveGridLayout
				className="layout"
				layouts={layouts}
				breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
				cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
			>
				<div key="1">1</div>
				<div key="2">2</div>
				<div key="3">3</div>
			</ResponsiveGridLayout>
		);
	}
}

export default MyResponsiveGrid;
