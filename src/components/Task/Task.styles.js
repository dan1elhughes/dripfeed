import styled from 'styled-components';

const getLeftBorder = props => {
	const { priority } = props;

	return `10px solid var(--priority-${priority.toLowerCase()})`;
};

export const StyledTaskItem = styled.div`
	border: 1px solid ${props => (props.isOpen ? 'grey' : 'transparent')};
	border-left: ${props => getLeftBorder(props)};
	text-align: left;
	margin-bottom: 1em;
	padding: 1em;
	cursor: pointer;
	transition: transform 0.25s, opacity 0.1s;
	transform: ${props => (props.isOpen ? 'scale(1.01)' : 'scale(1)')};
	box-shadow: ${props =>
		props.isOpen ? '5px 5px 5px rgba(0, 0, 0, 0.33)' : 'none'};
	&:hover {
		opacity: 0.66;
	}
`;

export const StyledTaskTitle = styled.p`
	margin: 0;
	padding: 0;
`;

export const StyledTaskInterior = styled.div`
	height: ${props => (props.isOpen ? 'auto' : '0')};
	overflow: hidden;
`;

export const StyledPriority = styled.p`
	margin: 0;
	margin-bottom: 5px;
`;

export const StyledSubtext = styled.p`
	color: var(--color-text-dim);
	margin: 0;
`;

export const StyledProfilePicture = styled.img`
	width: 50px;
	border-radius: 50%;
	margin-right: 15px;
`;

export const StyledTaskMetadata = styled.div`
	display: flex;
	& > div {
		flex-basis: 50%;
	}

	& > div:nth-of-type(2) {
		display: flex;
		align-items: center;
	}

	margin-bottom: 2em;
	margin-top: 1em;
`;
