import styled from 'styled-components';

const getLeftBorder = props => {
	const { priority } = props;

	return `10px solid var(--priority-${priority.toLowerCase()})`;
};

const getBottomBorder = props => {
	const { isOpen } = props;

	if (isOpen) {
		return '1px solid grey';
	}

	return '3px solid var(--color-background-fill)';
};

export const StyledTaskItem = styled.div`
	border: 1px solid ${props => (props.isOpen ? 'grey' : 'transparent')};
	border-bottom: ${props => getBottomBorder(props)};
	border-left: ${props => getLeftBorder(props)};
	text-align: left;
	margin-bottom: 1em;
	padding: 1em;
	cursor: pointer;
	&:hover {
		background: #444;
	}
`;

export const StyledTaskInterior = styled.div`
	height: ${props => (props.isOpen ? 'auto' : '0')};
	overflow: hidden;
`;
