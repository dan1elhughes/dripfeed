import Base from './Base';

export default class Jira extends Base {
	tickets(jql) {
		const { name: instance, base } = this;
		return this.fetch('/rest/api/latest/search', { jql }).then(({ issues }) =>
			issues.map(({ key, fields }) => ({
				instance,
				key,
				priority: fields.priority.name,
				status: fields.status.name,
				reporter: {
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
				type: fields.issuetype.name,
				project: fields.project.key,
				summary: fields.summary,
			}))
		);
	}
}
