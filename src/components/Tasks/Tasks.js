import React from 'react';
import bindMethods from 'yaab';
import styled from 'styled-components';

import JiraConnector from '../../api/Jira';
import BitbucketConnector from '../../api/Bitbucket';

import Task from '../Task/Task';

const StyledHeader = styled.h2`
	text-transform: uppercase;
	font-weight: normal;
`;

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
				if (auth.type === 'bitbucket') {
					return new BitbucketConnector(auth).pullRequests();
				}
			})
		);

		const flattenedTasks = [].concat.apply([], tasks).filter(Boolean);

		const sortedTasks = flattenedTasks.sort((a, b) => {
			if (a._type === 'pr') return -1;
			if (b._type === 'pr') return 1;

			const order = ['Lowest', 'Low', 'Medium', 'High', 'Highest'];

			const priorityOfA = order.indexOf(a.priority);
			const priorityOfB = order.indexOf(b.priority);

			return priorityOfB - priorityOfA;
		});

		// console.log(sortedTasks);
		this.setState({
			items: sortedTasks,
		});
	}

	render() {
		const { items } = this.state;

		return (
			<div className="Tasks">
				<StyledHeader>Tasks</StyledHeader>
				{items.map(({ key: id, _type, ...item }) => (
					<Task key={id} id={id} _type={_type} {...item} />
				))}
			</div>
		);
	}
}
