import React from 'react';
import bindMethods from 'yaab';

import JiraConnector from '../../api/Jira';
import BitbucketConnector from '../../api/Bitbucket';

import Ellipsis from '../Ellipsis/Ellipsis';
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
		this.state = { tasks: [], loading: [] };
		bindMethods(this);
	}

	async componentWillReceiveProps(nextProps) {
		const { settings } = nextProps;

		const jiraAuths = settings.filter(auth => auth.type === 'jira');
		const bitbucketAuths = settings.filter(auth => auth.type === 'bitbucket');

		this.setState({
			tasks: [],
			loading: [...jiraAuths, ...bitbucketAuths].map(auth => auth.name),
		});

		jiraAuths.forEach(auth => {
			new JiraConnector(auth).tickets(
				'assignee = currentUser() AND resolution is EMPTY',
				(newTasks, done) => {
					this.setState(
						({ tasks, loading }) => ({
							tasks: [...tasks, ...newTasks],
							loading: done
								? loading.filter(name => name !== auth.name)
								: loading,
						}),
						this.sortTasks
					);
				}
			);
		});

		bitbucketAuths.forEach(auth => {
			new BitbucketConnector(auth).pullRequests('author', (PRs, done) => {
				this.setState(
					({ tasks, loading }) => ({
						tasks: [...tasks, ...PRs],
						loading: done
							? loading.filter(name => name !== auth.name)
							: loading,
					}),
					this.sortTasks
				);
			});
			new BitbucketConnector(auth).pullRequests('reviewer', (PRs, done) => {
				this.setState(
					({ tasks, loading }) => ({
						tasks: [...tasks, ...PRs],
						loading: done
							? loading.filter(name => name !== auth.name)
							: loading,
					}),
					this.sortTasks
				);
			});
		});
	}

	sortTasks() {
		const order = ['Lowest', 'Low', 'Medium', 'High', 'Highest'];

		this.setState(({ tasks }) => ({
			tasks: tasks.slice().sort((a, b) => {
				const priorityOfA = order.indexOf(a.priority);
				const priorityOfB = order.indexOf(b.priority);

				return priorityOfB - priorityOfA;
			}),
		}));
	}

	render() {
		const { tasks, loading } = this.state;

		return (
			<div className="Tasks">
				<Header level={2} centered={true}>
					Tasks{tasks.length > 0 ? ` (${tasks.length})` : ''}
				</Header>
				{loading.map(name => (
					<p key={name}>
						Loading tasks from {name}
						<Ellipsis />
					</p>
				))}
				{tasks.map(({ key: id, ...item }) => (
					<Task key={id} id={id} {...item} />
				))}
			</div>
		);
	}
}
