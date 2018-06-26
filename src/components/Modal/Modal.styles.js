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
	input {
		background: transparent;
		border: 0;
		border-bottom: 1px solid var(--color-white);
		color: var(--color-white);
		line-height: 1.25em;
		margin-bottom: var(--spacing-medium);
		padding: var(--spacing-small) var(--spacing-small) var(--spacing-small) 0;
		width: 100%;
		&::placeholder {
			color: var(--color-white);
		}
	}
	button {
		background: transparent;
		border: 1px solid var(--color-white);
		border-radius: 5px;
		color: var(--color-white);
		font-size: 14px;
		margin-bottom: var(--spacing-medium);
		padding: var(--spacing-medium);
		text-transform: uppercase;
		transition: background 0.25s, color 0.25s, border 0.5s;
		&:hover {
			background: var(--color-text-positive);
			border: 1px solid var(--color-text-positive);
			color: var(--color-white);
			cursor: pointer;
		}
		&.Cancel {
			&:hover {
				background: var(--color-button-negative);
				border: 1px solid var(--color-button-negative);
				color: var(--color-white);
				cursor: pointer;
			}
		}
	}
	.ButtonContainer {
		display: flex;
		justify-content: space-between;
	}
`;
