const themed = options => props => {
	if (
		typeof options.dark === 'undefined' ||
		typeof options.light === 'undefined'
	) {
		/* eslint-disable no-console */
		return console.warn(
			`Themed object should have light and dark properties. Got: ${JSON.stringify(
				options
			)}`
		);
		/* eslint-enable */
	}

	return props.theme.isDarkMode ? options.dark : options.light;
};

export default themed;
