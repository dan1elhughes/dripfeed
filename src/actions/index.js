import BitbucketConnector from '../api/Bitbucket';
import JiraConnector from '../api/Jira';

const map = fn => arr => arr.map(fn);

export default {
	boot: settings => (state, actions) => {
		for (const instance in settings.bitbucket) {
			const [ base, username, password ] = settings.bitbucket[instance];
			actions.fetchPRs({ instance, base, username, password });
		}

		const { filter, ...jiras } = settings.jira;
		for (const instance in jiras) {
			const [ base, username, password ] = settings.jira[instance];
			actions.fetchTickets({ filter, instance, base, username, password });
		}
	},

	fetchTickets: settings => (state, actions) => new JiraConnector(settings).tickets().then(map(actions.addTicket)),
	fetchPRs: settings => (state, actions) => new BitbucketConnector(settings).pullRequests().then(map(actions.addPR)),

	addTicket: ticket => state => ({ tickets: [...state.tickets, ticket] }),
	addPR: pr => state => ({ pullRequests: [...state.pullRequests, pr] }),
};
