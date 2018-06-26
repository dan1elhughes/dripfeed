import styled, { keyframes } from 'styled-components';

const countAnimation = keyframes`
	0% {
		content: '..';
	}
	33% {
		content: '...';
	}
	66% {
		content: '....';
	}
`;

const StyledEllipsis = styled.span`
	&:after {
		content: '..';
		width: 1px;
		overflow: visible;
		display: inline-block;
		animation: ${countAnimation} 2s infinite;
	}
`;

export default StyledEllipsis;
