import styled from 'styled-components';

import { color, spacing } from '../../styles/tokens.json';

import chevron from './assets/SettingPanel-Chevron.png';

export const width = 400;

export const StyledHeader = styled.h2`
	text-transform: uppercase;
	font-weight: normal;
	clear: both;
`;

export const StyledPanel = styled.div`
	background: #000000;
	border-radius: 0 0 0 10px;
	color: #ffffff;
	position: fixed;
	top: 0;
	right: 0;
	width: ${width}px;
	padding: ${spacing.large};
	text-align: center;
	transition: transform 0.5s;
	transform: translateX(
		${props =>
			props.isOpen ? '0px' : `calc(${width}px + calc(${spacing.large})*2)`}
	);
	button {
		background: #ffffff;
		border: 0;
		border-radius: 5px;
		font-size: 14px;
		padding: ${spacing.medium};
		text-transform: uppercase;
		transition: background 0.25s, color 0.25s;
		width: 100%;
		&:hover {
			background: ${color.text.positive};
			color: #ffffff;
			cursor: pointer;
		}
	}
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
