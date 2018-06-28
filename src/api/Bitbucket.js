import Base from './Base';

export default class Bitbucket extends Base {
	async fetchFrom(role, startAt = 0) {
		return this.fetch('/rest/api/latest/inbox/pull-requests', {
			role,
			state: 'OPEN',
			order: 'newest',
			startAt,
			maxResults: 50,
		});
	}

	format(PRs) {
		const { name: instance, base } = this;

		return PRs.map(pr => ({
			instance,
			key: `${pr.toRef.repository.project.key}/${pr.toRef.repository.slug}`,
			priority: 'Highest',
			summary: pr.title,
			author: {
				name: pr.author.user.name,
				displayName: pr.author.user.displayName,
				photo: `${base}/users/${pr.author.user.name}/avatar.png?s=128`,
			},
			assignees: pr.reviewers.map(r => ({
				name: r.user.name,
				displayName: r.user.displayName,
				photo: `${base}/users/${r.user.name}/avatar.png?s=128`,
			})),
			description: `<p><code>${pr.fromRef.displayId} → ${
				pr.toRef.displayId
			}</code></p>`,
		}));
	}

	async pullRequests(role, callback) {
		let isLastPage = false;

		while (!isLastPage) {
			const response = await this.fetchFrom(role);
			isLastPage = response.isLastPage;
			callback(this.format(response.values), isLastPage);
		}
	}
}
