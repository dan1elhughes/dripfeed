import { h } from 'hyperapp';

export default ({ title, instance, author, reviewers, repo, from, to, created }) => <div class='PullRequest'>
	<h2>Pull request</h2>
	<p>Title: {title}</p>
	<p>Instance: {instance}</p>
	<p>Author: {author.name} {author.displayName} <img src={author.photo}/></p>
	<p>Reviewers: {reviewers.map(reviewer =>
		<span>{reviewer.name} {reviewer.displayName} <img src={reviewer.photo}/></span>
	)}</p>
	<p>Repo: {repo}</p>
	<p>From: {from}</p>
	<p>To: {to}</p>
	<p>Created: {created}</p>
	<hr/>
</div>;
