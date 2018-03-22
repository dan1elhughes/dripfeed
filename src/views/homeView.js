import { h } from 'hyperapp';

import Dump from '../components/Dump';
import SettingsPanelView from './SettingsPanelView';

export default state => (
	<div>
		<SettingsPanelView accounts={state.accounts} onChange={console.log.bind(console)} />
		<Dump state={state.accounts} />
	</div>
);
