import { h } from 'hyperapp';

import PullRequest from './PullRequest';
import Ticket from './Ticket';

export default ({ pullRequests, tickets }) => (
	<div>
		{pullRequests.map(pr => <PullRequest {...pr} />)}
		{tickets.map(ticket => <Ticket {...ticket} />)}
	</div>
);
