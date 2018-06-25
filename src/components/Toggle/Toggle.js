import styled from 'styled-components';

import theme from '../../theme';

import Toggle from 'react-toggle';
import 'react-toggle/style.css';

export const ToggleContainer = styled.div`
	display: flex;
	align-items: center;
`;

export default styled(Toggle)`
	&& {
		.react-toggle-track {
			background-color: ${theme('color-background-fill')};
		}
		.react-toggle-thumb {
			background-color: ${theme('color-background-fill')};
		}
	}
`;
