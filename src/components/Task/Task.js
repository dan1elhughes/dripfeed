import React from 'react';
import PropTypes from 'prop-types';
import bindMethods from 'yaab';

import { StyledTaskItem, StyledTaskInterior } from './Task.styles';

export default class Task extends React.Component {
	static get propTypes() {
		return {
			id: PropTypes.string.isRequired,
			summary: PropTypes.string.isRequired,
			description: PropTypes.string,
			priority: PropTypes.oneOf(['Highest', 'High', 'Medium', 'Low', 'Lowest']),
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
		const { id, summary, priority } = this.props;
		const { isExpanded } = this.state;
		return (
			<StyledTaskItem
				onClick={this.toggleExpandedView}
				isOpen={isExpanded}
				priority={priority}
			>
				[{id}] {summary}
				<StyledTaskInterior isOpen={isExpanded}>
					<div dangerouslySetInnerHTML={{ __html: this.props.description }} />
				</StyledTaskInterior>
			</StyledTaskItem>
		);
	}
}
