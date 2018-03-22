import { h } from 'hyperapp';

import TextInput from '../components/TextInput';

export default ({ onChange, accounts }) => (
	<div>
		<h3>Accounts</h3>
		{accounts.map(account => (
			<div>
				<div>
					<TextInput placeholder='Name' value={account.name} onChange={onChange} />
					<TextInput placeholder='type' value={account.type} onChange={onChange} />
					<TextInput placeholder='endpoint' value={account.endpoint} onChange={onChange} />
					<TextInput placeholder='username' value={account.username} onChange={onChange} />
					<TextInput placeholder='password' value={account.password} onChange={onChange} />
				</div>
				<hr/>
			</div>
		))}
	</div>
);
