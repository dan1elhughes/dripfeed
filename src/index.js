import { app } from 'hyperapp';
import actions from './actions';
import state from './state';
import view from './views/homeView';
import settings from './settings';

const application = app(state, actions, view, document.body);

application.boot(settings);
