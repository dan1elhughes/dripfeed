const themed = identifier => props =>
	`var(--${identifier}-${props.theme.isDarkMode ? 'dark' : 'light'})`;

export default themed;
