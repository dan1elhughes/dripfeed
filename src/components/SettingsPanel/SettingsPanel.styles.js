import styled from 'styled-components';

import chevron from './assets/SettingPanel-Chevron.png';

export const width = 400;

export const StyledPanel = styled.div`
	background: #000000;
	border-radius: 0 0 0 10px;
	color: #ffffff;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	width: ${width}px;
	padding: var(--spacing-large);
	text-align: center;
	transition: transform 0.5s;
	transform: translateX(
		${props =>
			props.isOpen ? '0px' : `calc(${width}px + calc(var(--spacing-large)*2))`}
	);
	z-index: 2;
	button {
		background: #ffffff;
		border: 0;
		border-radius: 5px;
		font-size: 14px;
		margin-bottom: var(--spacing-medium);
		padding: var(--spacing-medium);
		text-transform: uppercase;
		transition: background 0.25s, color 0.25s;
		width: 100%;
		&:hover {
			background: var(--color-text-positive);
			color: #ffffff;
			cursor: pointer;
		}
	}
`;

export const Overlay = styled.div`
	position: fixed;
	left: ${props => (props.isOpen ? '0' : '-100%')};
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
	opacity: ${props => (props.isOpen ? '1' : '0')};
	z-index: 1;
	transition: opacity 0.5s, visibility 0.5s,
		left 0s ${props => (props.isOpen ? '0s' : '0.5s')};
`;

export const StyledPullTab = styled.div`
	background-color: #000000;
	border-radius: 10px 0 0 10px;
	color: #ffffff;
	cursor: pointer;
	position: absolute;
	left: -50px;
	font-size: 40px;
	width: 30px;
	height: 30px;
	padding: 10px;
	top: 0;
	&:after {
		background: url(${chevron}) no-repeat 50% 50% #000000;
		background-size: 50%;
		content: '.';
		display: block;
		transition: transform 0.5s;
		transform: rotate(${props => (props.isOpen ? '180deg' : '0deg')});
		text-indent: -9999px;
		height: 100%;
		width: 100%;
	}
`;
