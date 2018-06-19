import styled from 'styled-components';

import { color } from '../../styles/tokens.json';

export const StyledOfficeName = styled.p`
	text-transform: uppercase;
	color: ${props =>
		props.isWorkingHours ? color.text.positive : color.text.negative};
`;

export const StyledLocalTime = styled.h3`
	color: ${color.text.strong};
	font-weight: normal;
`;

export const StyledWeather = styled.p`
	color: ${color.text.dim};
`;
