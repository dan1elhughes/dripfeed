import { username, password } from './auth';

const filter = 'assignee = currentUser() ORDER BY priority DESC, updated DESC';

export default [
	{ name: 'Mirum BB', type: 'bitbucket', endpoint: 'https://bitbucket.mirum.agency', username, password },
	{ name: 'HSBC BB', type: 'bitbucket', endpoint: 'https://hsbc-bitbucket.heathwallace.com', username, password },
	{ name: 'Mirum Jira', type: 'jira', endpoint: 'https://jira.mirum.agency', username, password, filter },
	{ name: 'HSBC Jira', type: 'jira', endpoint: 'https://hsbc-jira.heathwallace.com', username, password, filter },
];
