import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import bindMethods from 'yaab';

import { color } from '../../styles/tokens.json';

const StyledTaskItem = styled.p`
	border-bottom: 3px solid ${color.background.fill};
	margin: 0;
	padding: 1em;
	cursor: pointer;
	text-align: left;
	&:hover {
		background: #444;
	}
`;

const StyledTaskExpandedView = styled.div`
	height: ${props => (props.isOpen ? 'auto' : '0')};
	overflow: hidden;
`;

export default class Task extends React.Component {
	static get propTypes() {
		return {
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string,
			_type: PropTypes.oneOf(['ticket', 'pr']).isRequired,
		};
	}

	constructor(props) {
		super(props);
		this.state = { isExpanded: false };
		bindMethods(this);
	}

	toggleExpandedView() {
		this.setState(({ isExpanded }) => ({
			isExpanded: !isExpanded,
		}));
	}

	render() {
		const { id, title } = this.props;
		return (
			<div className="Task">
				<StyledTaskItem onClick={this.toggleExpandedView}>
					[{id}] {title}
				</StyledTaskItem>
				<StyledTaskExpandedView isOpen={this.state.isExpanded}>
					<div dangerouslySetInnerHTML={{ __html: this.props.description }} />
					<pre>
						<code>{JSON.stringify(this.props, null, 4)}</code>
					</pre>
				</StyledTaskExpandedView>
			</div>
		);
	}
}
