import Base from './Base';

export default class Jira extends Base {
	tickets(jql) {
		const { name: instance, base } = this;
		return this.fetch('/rest/api/latest/search', {
			expand: 'renderedFields',
			jql,
		}).then(({ issues }) =>
			issues.map(({ key, fields, renderedFields }) => ({
				_type: 'ticket',
				instance,
				id: key,

				project: fields.project.key,
				title: fields.summary,
				description: renderedFields.description,

				priority: fields.priority.name,
				status: fields.status.name,
				type: fields.issuetype.name,

				creator: {
					name: fields.reporter.name,
					displayName: fields.reporter.displayName,
					photo: `${base}/secure/useravatar?ownerId=${fields.reporter.name}`,
				},
				assignees: [
					{
						name: fields.assignee.name,
						displayName: fields.assignee.displayName,
						photo: `${base}/secure/useravatar?ownerId=${fields.assignee.name}`,
						approval: 'UNAPPROVED',
					},
				],
			}))
		);
	}
}
