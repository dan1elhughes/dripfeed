import styled from 'styled-components';

import { color } from '../../styles/tokens.json';

export const StyledHeader = styled.h2`
	text-transform: uppercase;
	font-weight: normal;
	margin: 0;
`;

export const StyledAvatar = styled.img`
	width: 70px;
	height: auto;
	border-radius: 10px;
	float: left;
	margin-right: 20px;
	margin-bottom: 20px;
`;

export const StyledName = styled.h3`
	margin-bottom: 0px;
`;

export const StyledSubText = styled.p`
	margin-top: 0px;
	text-transform: uppercase;
	color: ${color.text.dim};
`;
