import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import bindMethods from 'yaab';

import { color } from '../../styles/tokens.json';

const StyledTaskItem = styled.p`
	border-bottom: 3px solid ${color.background.fill};
	margin: 0;
	padding: 1em 0;
	cursor: pointer;
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
			summary: PropTypes.string.isRequired,
			description: PropTypes.string,
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
		const { id, summary } = this.props;
		return (
			<div className="Task">
				<StyledTaskItem onClick={this.toggleExpandedView}>
					[{id}] {summary}
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
