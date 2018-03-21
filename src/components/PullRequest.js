import { h } from 'hyperapp';

export default ({ title, instance, author, reviewers, repo, from, to, created }) => <div>
	<h2>Pull request</h2>
	<p>Title: {title}</p>
	<p>Instance: {instance}</p>
	<p>Author: {author}</p>
	<p>Reviewers: {reviewers.map(src => <img src={src}/>)}</p>
	<p>Repo: {repo}</p>
	<p>From: {from}</p>
	<p>To: {to}</p>
	<p>Created: {created}</p>
</div>;
