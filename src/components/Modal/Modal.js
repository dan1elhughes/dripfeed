import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { spacing } from '../../styles/tokens.json';

const StyledModal = styled.div`
	background: #205081;
	border-radius: 10px;
	left: 50%;
	padding: ${spacing.large};
	position: fixed;
	top: 50%;
	transform: translate(-50%, -50%);
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
