import React, { Component } from 'react';
import bindMethods from 'yaab';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';

import { color, font, spacing } from './styles/tokens.json';

import Store from './Store';

import LocationTile from './components/LocationTile/LocationTile';
import OutTile from './components/OutTile/OutTile';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import Tasks from './components/Tasks/Tasks';
import Tile from './components/Tile/Tile';

import 'weathericons/css/weather-icons.min.css';
import 'react-toggle/style.css';

import themed from './themed';

const StyledContainer = styled.div`
	transition: background-color 0.25s;
	background-color: ${themed(color.background.fill)};

	color: ${color.text.strong};
	box-sizing: border-box;
	display: grid;
	grid-gap: ${spacing.large};
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(3, 1fr);
	height: 100vh;
	padding: ${spacing.large};
`;

const store = new Store();

const offices = [
	{ name: 'Chicago', woeId: 2379574, locale: 'America/Chicago' },
	{ name: 'Reading', woeId: 22484804, locale: 'Europe/London' },
	{
		name: 'Hong Kong',
		woeId: 12467924,
		locale: 'Asia/Hong_Kong',
	},
	{
		name: 'Melbourne',
		woeId: 1103816,
		locale: 'Australia/Melbourne',
	},
];

injectGlobal`
	@import '${font.body.url}';

	#root {
		font-family: ${font.body.family};
	}
`;

export default class App extends Component {
	static get initialState() {
		return {
			issues: [],
			settings: [],
			theme: {
				isDarkMode: true,
			},
		};
	}

	constructor(props) {
		super(props);
		this.state = App.initialState;
		bindMethods(this);
	}

	componentDidMount() {
		const settings = store.get('settings');
		this.setState({
			settings,
		});
	}

	updateSettings(settings) {
		store.set('settings', settings);
		this.setState({ settings });
	}

	onThemeChange(dark) {
		this.setState(({ theme }) => ({
			theme: { ...theme, isDarkMode: dark },
		}));
	}

	render() {
		const { settings, theme } = this.state;

		return (
			<div className="App">
				<ThemeProvider theme={theme}>
					<React.Fragment>
						<StyledContainer>
							{offices.map(office => (
								<Tile
									key={office.name}
									component={LocationTile}
									office={office}
								/>
							))}
							<Tile component={Tasks} settings={settings} />
							<Tile component={OutTile} settings={settings} />
						</StyledContainer>
						<SettingsPanel
							settings={settings}
							onChange={this.updateSettings}
							onThemeChange={this.onThemeChange}
							theme={theme}
						/>
					</React.Fragment>
				</ThemeProvider>
			</div>
		);
	}
}
