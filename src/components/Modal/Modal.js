import React from 'react';
import PropTypes from 'prop-types';

import { StyledModal } from './Modal.styles';

const Modal = ({ children, isVisible }) => {
	if (!isVisible) return null;
	return <StyledModal>{children}</StyledModal>;
};

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	isVisible: PropTypes.bool.isRequired,
};

export default Modal;
