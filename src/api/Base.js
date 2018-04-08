export default class Base {
	constructor({ base, username, password, name }) {
		this.base = base;
		this.auth = btoa(`${username}:${password}`);
		this.name = name;
	}

	fetch(route, params) {
		const allParams = {
			...params,
			_proxyTo: this.base + route,
		};

		const esc = encodeURIComponent;
		const url =
			'http://localhost:3001/api/proxy/?' +
			Object.keys(allParams)
				.map(key => `${esc(key)}=${esc(allParams[key])}`)
				.join('&');

		let headers = {
			Authorization: 'Basic ' + this.auth,
		};

		return fetch(url, { headers }).then(response => response.json());
	}
}
