import Base from './Base';

export default class Jira extends Base {
	async fetchFrom(jql, startAt = 0) {
		return this.fetch('/rest/api/latest/search', {
			expand: 'renderedFields',
			jql,
			startAt,
			maxResults: 50,
		});
	}

	format(issues) {
		const { name: instance, base } = this;
		return issues.map(({ key, fields, renderedFields }) => ({
			instance,
			key,
			priority: fields.priority.name,
			summary: fields.summary,
			author: {
				name: fields.reporter.name,
				displayName: fields.reporter.displayName,
				photo: `${base}/secure/useravatar?ownerId=${fields.reporter.name}`,
			},
			assignees: [
				{
					name: fields.assignee.name,
					displayName: fields.assignee.displayName,
					photo: `${base}/secure/useravatar?ownerId=${fields.assignee.name}`,
				},
			],
			description: renderedFields.description,
		}));
	}

	async tickets(jql, callback) {
		let numReceived = 0;
		let numWanted = Infinity;

		while (numReceived < numWanted) {
			const { issues, total } = await this.fetchFrom(jql, numReceived);
			numWanted = total;
			numReceived += issues.length;
			const done = numWanted === numReceived;
			callback(this.format(issues), done);
		}
	}
}
