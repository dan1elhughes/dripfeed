import styled from 'styled-components';

import theme from '../../theme';

export const StyledTile = styled.div`
	transition: color 0.25s, background-color 0.25s, box-shadow 0.25s;
	color: ${theme('color-text-header')};
	background-color: ${theme('color-background-tile')};
	box-shadow: 0 0 40px ${theme('shadow')};
	border-radius: var(--radius-large);
	grid-area: span ${props => props.height} / span ${props => props.width};
	overflow-y: auto;
	text-align: center;
	padding: var(--spacing-medium);
`;
