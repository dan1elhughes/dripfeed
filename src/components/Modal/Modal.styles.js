import styled from 'styled-components';

export const StyledModal = styled.div`
	background: ${props => {
		if (props.type === 'jira') {
			return `#205081`;
		} else if (props.type === 'bitbucket') {
			return `#205081`;
		} else if (props.type === 'forecast') {
			return `#f36c00`;
		}
	}}
	border-radius: 10px;
	color: var(--color-white);
	left: 50%;
	padding: var(--spacing-large);
	position: fixed;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 3;
`;
