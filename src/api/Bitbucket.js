export default class Bitbucket {
	constructor({ name, endpoint, username, password }) {
		this.instance = name;
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

	pullRequests() {
		return this.fetch('/rest/api/latest/inbox/pull-requests', {
			role: 'reviewer',
			state: 'OPEN',
			order: 'newest',
		}).then(({ values }) => values.map(pr => ({
			instance: this.instance,
			title: pr.title,
			author: {
				name: pr.author.user.name,
				displayName: pr.author.user.displayName,
				photo: `${this.base}/users/${pr.author.user.name}/avatar.png?s=128`,
			},
			reviewers: pr.reviewers.map(r => ({
				name: r.user.name,
				displayName: r.user.displayName,
				photo: `${this.base}/users/${r.user.name}/avatar.png?s=128`,
			})),
			repo: `${pr.toRef.repository.project.key}/${pr.toRef.repository.slug}`,
			from: pr.fromRef.displayId,
			to: pr.toRef.displayId,
			created: pr.createdDate,
		})));
	}
}
