export default class Bitbucket {
	constructor({ instance, base, username, password }) {
		this.instance = instance;
		this.base = base;
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

	pullRequests() {
		return this.fetch('/rest/api/latest/inbox/pull-requests', {
			role: 'reviewer',
			state: 'OPEN',
			order: 'newest',
		}).then(({ values }) => values.map(pr => ({
			instance: this.instance,
			title: pr.title,
			author: pr.author.user.displayName,
			reviewers: pr.reviewers.map(r => `${this.base}/users/${r.user.name}/avatar.png?s=128`),
			repo: `${pr.toRef.repository.project.key}/${pr.toRef.repository.slug}`,
			from: pr.fromRef.displayId,
			to: pr.toRef.displayId,
			created: pr.createdDate,
		})));
	}
}
