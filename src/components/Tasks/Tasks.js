import React from 'react';
import PropTypes from 'prop-types';
import bindMethods from 'yaab';
import styled from 'styled-components';

import Task from '../Task/Task';

const StyledHeader = styled.h2`
	text-transform: uppercase;
	font-weight: normal;
`;

export default class Tasks extends React.Component {
	static get propTypes() {
		return {
			tasks: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string.isRequired,
					summary: PropTypes.string.isRequired,
				})
			).isRequired,
		};
	}

	constructor(props) {
		super(props);
		this.state = {};
		bindMethods(this);
	}

	render() {
		const { items } = this.props;
		return (
			<div className="Tasks">
				<StyledHeader>Tasks</StyledHeader>
				{items.map(({ key: id, ...item }) => (
					<Task key={id} id={id} {...item} />
				))}
			</div>
		);
	}
}
