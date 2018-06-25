import styled from 'styled-components';

import themed from '../../themed';

import { color, radius, spacing, shadow } from '../../styles/tokens.json';

export const StyledTile = styled.div`
	transition: color 0.25s, background-color 0.25s, box-shadow 0.25s;
	color: ${themed(color.text.header)}
	background-color: ${themed(color.background.tile)};
	box-shadow: 0 0 40px ${themed(shadow)};
	border-radius: ${radius.large};
	grid-area: span ${props => props.height} / span ${props => props.width};
	overflow-y: auto;
	text-align: center;
	padding: ${spacing.medium};
`;
