import styled from 'styled-components';

export const StyledOfficeName = styled.p`
	text-transform: uppercase;
	color: ${props =>
		props.isWorkingHours
			? 'var(--color-text-positive)'
			: 'var(--color-text-negative)'};
`;

export const StyledLocalTime = styled.h3`
	color: var(--color-text-strong);
	font-weight: normal;
`;

export const StyledWeather = styled.p`
	color: var(--color-text-dim);
`;
