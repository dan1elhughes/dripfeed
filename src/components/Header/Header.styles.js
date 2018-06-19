import styled from 'styled-components';

import { spacing } from '../../styles/tokens.json';

const getFontSizeFromProps = props =>
	({
		1: '30px',
		2: '24px',
		3: '18px',
	}[props.level]);

export default function createStyledHeader(level) {
	return styled[`h${level}`]`
		text-transform: uppercase;
		font-weight: normal;
		font-size: ${getFontSizeFromProps};
		margin: 0 0 ${spacing.medium} 0;
	`;
}
