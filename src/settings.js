import { username, password } from './auth';

export default {
	bitbucket: {
		Mirum: ['https://bitbucket.mirum.agency', username, password],
		HSBC: ['https://hsbc-bitbucket.heathwallace.com', username, password],
	},
	jira: {
		filter: 'assignee = currentUser() ORDER BY priority DESC, updated DESC',
		Mirum: ['https://jira.mirum.agency', username, password],
		HSBC: ['https://hsbc-jira.heathwallace.com', username, password],
	},
};
