import { h } from 'hyperapp';

import PullRequest from './PullRequest';
import Ticket from './Ticket';

export default ({ pullRequests, tickets }) => (
	<div>
		{pullRequests.map(pr => (
			<div>
				<PullRequest {...pr} />
				<hr/>
			</div>
		))}
		{tickets.map(pr => (
			<div>
				<Ticket {...pr} />
				<hr/>
			</div>
		))}
	</div>
);
