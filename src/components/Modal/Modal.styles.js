import styled from 'styled-components';

import { spacing } from '../../styles/tokens.json';

export const StyledModal = styled.div`
	background: #205081;
	border-radius: 10px;
	left: 50%;
	padding: ${spacing.large};
	position: fixed;
	top: 50%;
	transform: translate(-50%, -50%);
`;
