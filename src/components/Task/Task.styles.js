import styled from 'styled-components';

import { color } from '../../styles/tokens.json';

export const StyledTaskItem = styled.p`
	border-bottom: 3px solid ${color.background.fill};
	margin: 0;
	padding: 1em;
	cursor: pointer;
	text-align: left;
	&:hover {
		background: #444;
	}
`;

export const StyledTaskExpandedView = styled.div`
	height: ${props => (props.isOpen ? 'auto' : '0')};
	overflow: hidden;
`;
