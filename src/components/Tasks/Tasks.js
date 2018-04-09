import React from 'react';
import PropTypes from 'prop-types';
import bindMethods from 'yaab';
import styled from 'styled-components';

import JiraConnector from '../../api/Jira';

import Task from '../Task/Task';

const StyledHeader = styled.h2`
	text-transform: uppercase;
	font-weight: normal;
`;

export default class Tasks extends React.Component {
	static get propTypes() {
		return {
			items: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string.isRequired,
					summary: PropTypes.string.isRequired,
				})
			).isRequired,
		};
	}

	static get layout() {
		return {
			height: 3,
			width: 2,
		};
	}

	constructor(props) {
		super(props);
		this.state = { items: [] };
		bindMethods(this);
	}

	async componentWillReceiveProps(nextProps) {
		const { settings } = nextProps;

		const tasks = await Promise.all(
			settings.map(auth => {
				if (auth.type === 'jira') {
					return new JiraConnector(auth).tickets(
						'assignee = currentUser() AND resolution is EMPTY'
					);
				}
			})
		);

		const flattenedTasks = [].concat.apply([], tasks);

		const sortedTasks = flattenedTasks.sort((a, b) => {
			const order = ['Lowest', 'Low', 'Medium', 'High', 'Highest'];

			const priorityOfA = order.indexOf(a.priority);
			const priorityOfB = order.indexOf(b.priority);

			return priorityOfB - priorityOfA;
		});

		this.setState({
			items: sortedTasks,
		});
	}

	render() {
		const { items } = this.state;
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
