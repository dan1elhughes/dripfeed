import Base from './Base';

export default class Bitbucket extends Base {
	pullRequests() {
		const { name: instance } = this;
		return this.fetch('/rest/api/latest/inbox/pull-requests', {
			expand: 'renderedFields',
			role: 'reviewer',
			state: 'OPEN',
			order: 'newest',
		}).then(({ values }) =>
			values.map(pr => ({
				_type: 'pr',
				instance,
				id: 'TBD',

				project: `${pr.toRef.repository.project.key}/${
					pr.toRef.repository.slug
				}`,
				title: pr.title,
				description: 'TODO',

				priority: 'Highest',
				status: 'Open',
				type: 'PR',

				creator: {
					name: pr.author.user.name,
					displayName: pr.author.user.displayName,
					photo: `${this.base}/users/${pr.author.user.name}/avatar.png?s=128`,
				},
				assignees: pr.reviewers.map(r => ({
					name: r.user.name,
					displayName: r.user.displayName,
					photo: `${this.base}/users/${r.user.name}/avatar.png?s=128`,
					approved: r.status,
				})),
			}))
		);
	}
}
