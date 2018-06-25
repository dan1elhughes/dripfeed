/* eslint-disable no-console */
import tokens from './tokens.flat.json';

const themed = identifier => props => {
	const withDark = identifier + '-dark';
	const withLight = identifier + '-light';
	if (!tokens[withDark]) {
		return console.error(`${withDark} is not a defined token`);
	}
	if (!tokens[withLight]) {
		return console.error(`${withLight} is not a defined token`);
	}
	return `var(--${props.theme.isDarkMode ? withDark : withLight})`;
};

export default themed;
