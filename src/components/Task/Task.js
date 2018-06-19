import React from 'react';
import PropTypes from 'prop-types';
import bindMethods from 'yaab';

import { StyledTaskItem, StyledTaskExpandedView } from './Task.styles';

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
