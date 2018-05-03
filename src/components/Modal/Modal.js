import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledModal = styled.div`
	position: fixed;
	top: 30vh;
	left: 50vw;
	padding: 5em;
	background: lightblue;
`;

const Modal = ({ children, isVisible }) => {
	if (!isVisible) return null;
	return <StyledModal>{children}</StyledModal>;
};

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	isVisible: PropTypes.bool.isRequired,
};

export default Modal;
