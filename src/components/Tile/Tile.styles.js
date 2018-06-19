import styled from 'styled-components';

import { color, radius, spacing } from '../../styles/tokens.json';

export const StyledTile = styled.div`
	background: ${color.background.tile};
	border-radius: ${radius.large};
	grid-area: span ${props => props.height} / span ${props => props.width};
	overflow-y: auto;
	text-align: center;
	padding: ${spacing.medium};
`;
