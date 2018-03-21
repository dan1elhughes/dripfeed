import { h } from 'hyperapp';

export default ({ instance, key, priority, status, reporter, type, project, summary }) => <div class='Ticket'>
	<h2>Ticket</h2>
	<p>Instance: {instance}</p>
	<p>Key: {key}</p>
	<p>Priority: {priority}</p>
	<p>Status: {status}</p>
	<p>Reporter: {reporter.name} {reporter.displayName} <img src={reporter.photo}/></p>
	<pre><code>{JSON.stringify(reporter, null, 4)}</code></pre>
	<p>Type: {type}</p>
	<p>Project: {project}</p>
	<p>Summary: {summary}</p>
	<hr/>
</div>;
