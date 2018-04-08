import React, { Component } from 'react';
import bindMethods from 'yaab';
import Store from './Store';
import JiraConnector from './api/Jira';
import LocationTile from './components/LocationTile/LocationTile';
import './App.css';
import 'weathericons/css/weather-icons.min.css';

const filter =
	'assignee = currentUser() AND resolution is EMPTY ORDER BY priority DESC, updated DESC';

const store = new Store();

const offices = [
	{ name: 'Chicago', woeId: 2379574, locale: 'America/Chicago' },
	{ name: 'Reading', woeId: 22484804, locale: 'Europe/London' },
	{
		name: 'Hong Kong',
		woeId: 12467924,
		locale: 'Asia/Hong_Kong',
	},
	{
		name: 'Melbourne',
		woeId: 1103816,
		locale: 'Australia/Melbourne',
	},
];

// store.set('settings', {
// 	auth: {
// 		base: 'FILL THIS IN',
// 		name: 'FILL THIS IN',
// 		username: 'FILL THIS IN',
// 		password: 'FILL THIS IN',
// 	},
// });

export default class App extends Component {
	static get initialState() {
		return {
			issues: [],
		};
	}

	constructor(props) {
		super(props);
		this.state = App.initialState;
		bindMethods(this);
	}

	componentDidMount() {
		const jira = new JiraConnector(store.get('settings').auth);
		jira.tickets(filter).then(issues =>
			this.setState({
				issues,
				settings: store.get('settings'),
			})
		);
	}

	render() {
		return (
			<div className="App" style={{ backgroundColor: '#1A1F25' }}>
				{offices.map(office => (
					<LocationTile key={office.name} office={office} />
				))}
				<pre>
					<code>{JSON.stringify(this.state, null, 4)}</code>
				</pre>
			</div>
		);
	}
}
