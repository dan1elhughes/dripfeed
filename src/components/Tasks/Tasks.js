import React from 'react';
import bindMethods from 'yaab';

import JiraConnector from '../../api/Jira';

import Task from '../Task/Task';
import Header from '../Header/Header';

export default class Tasks extends React.Component {
	static get propTypes() {
		// TODO
		return {};
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

		const flattenedTasks = [].concat.apply([], tasks).filter(Boolean);

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
				<Header level={2} centered={true}>
					Tasks
				</Header>
				{items.map(({ key: id, ...item }) => (
					<Task key={id} id={id} {...item} />
				))}
			</div>
		);
	}
}
