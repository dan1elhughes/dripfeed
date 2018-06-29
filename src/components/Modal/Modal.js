import React from 'react';
import PropTypes from 'prop-types';

import { StyledModal } from './Modal.styles';

const Modal = ({ children, isVisible, type }) => {
	if (!isVisible) return null;
	return <StyledModal type={type}>{children}</StyledModal>;
};

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	isVisible: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
};

export default Modal;
