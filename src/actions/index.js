import BitbucketConnector from '../api/Bitbucket';
import JiraConnector from '../api/Jira';

const map = fn => arr => arr.map(fn);

export default {
	boot: settings => (state, actions) => {
		actions.loadAccounts(settings);
	},

	loadAccounts: accounts => (state, actions) => {
		accounts.forEach(account => {
			if (account.type === 'bitbucket') actions.fetchPRs(account);
			if (account.type === 'jira') actions.fetchTickets(account);
		});

		return { accounts };
	},

	fetchTickets: settings => (state, actions) => new JiraConnector(settings).tickets().then(map(actions.addTicket)),
	fetchPRs: settings => (state, actions) => new BitbucketConnector(settings).pullRequests().then(map(actions.addPR)),

	addTicket: ticket => state => ({ tickets: [...state.tickets, ticket] }),
	addPR: pr => state => ({ pullRequests: [...state.pullRequests, pr] }),

	onSettingChange: ({ account, field, value }) => state => {
		console.log(state);
		// const { settings } = state;
	},
};
