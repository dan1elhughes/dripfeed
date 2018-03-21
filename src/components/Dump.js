import { h } from 'hyperapp';

export default state => (
	<pre><code>{JSON.stringify(state, null, 4)}</code></pre>
);
