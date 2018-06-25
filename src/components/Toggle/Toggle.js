import styled from 'styled-components';

import { color } from '../../styles/tokens.json';

import Toggle from 'react-toggle';
import 'react-toggle/style.css';

export const ToggleContainer = styled.div`
	display: flex;
	align-items: center;
`;

export default styled(Toggle)`
	&& {
		.react-toggle-track {
			background-color: ${color.background.fill.light};
		}
		.react-toggle-thumb {
			background-color: ${color.background.fill.light};
		}
		&.react-toggle--checked {
			& .react-toggle-track {
				background-color: ${color.background.fill.dark};
			}
			& .react-toggle-thumb {
				background-color: ${color.background.fill.dark};
			}
		}
	}
`;
