/*
https://bitbucket.mirum.agency
	/rest/api/latest/inbox/pull-requests
		?
		role=reviewer
		&start=1
		&limit=1
		&state=OPEN
		&order=oldest
 */

export default class Jira {
	constructor({ name, endpoint, username, password, filter }) {
		this.instance = name;
		this.filter = filter;
		this.base = endpoint;
		this.auth = btoa(`${username}:${password}`);
	}

	fetch(route, params) {
		params._proxyTo = this.base + route;

		const esc = encodeURIComponent;
		const url = 'http://localhost:3001/api/proxy/?' + Object.keys(params).map(key => `${esc(key)}=${esc(params[key])}`).join('&');

		let headers = {
			'Authorization': 'Basic ' + this.auth,
		};

		return fetch(url, { headers })
			.then(response => response.json());
	}

	tickets() {
		return this.fetch('/rest/api/latest/search', {
			jql: this.filter,
		}).then(({ issues }) => issues.map(issue => ({
			instance: this.instance,
			key: issue.key,
			priority: issue.fields.priority.name,
			status: issue.fields.status.name,
			reporter: {
				name: issue.fields.reporter.name,
				displayName: issue.fields.reporter.displayName,
				photo: `${this.base}/secure/useravatar?ownerId=${issue.fields.reporter.name}`,
			},
			type: issue.fields.issuetype.name,
			project: issue.fields.project.key,
			summary: issue.fields.summary,
		})));
	}
}
