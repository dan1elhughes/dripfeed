import Base from './Base';

export default class Bitbucket extends Base {
	pullRequests() {
		return this.fetch('/rest/api/latest/inbox/pull-requests', {
			role: 'reviewer',
			state: 'OPEN',
			order: 'newest',
		}).then(({ values }) =>
			values.map(pr => ({
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
			}))
		);
	}
}
