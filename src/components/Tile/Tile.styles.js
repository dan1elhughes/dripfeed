import styled from 'styled-components';

import themed from '../../themed';

export const StyledTile = styled.div`
	transition: color 0.25s, background-color 0.25s, box-shadow 0.25s;
	color: ${themed('color-text-header')};
	background-color: ${themed('color-background-tile')};
	box-shadow: 0 0 40px ${themed('shadow')};
	border-radius: var(--radius-large);
	grid-area: span ${props => props.height} / span ${props => props.width};
	overflow-y: auto;
	text-align: center;
	padding: var(--spacing-medium);
`;
