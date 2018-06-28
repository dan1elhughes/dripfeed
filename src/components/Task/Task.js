import React from 'react';
import PropTypes from 'prop-types';
import bindMethods from 'yaab';

import {
	StyledTaskItem,
	StyledTaskInterior,
	StyledSubtext,
	StyledProfilePicture,
	StyledTaskMetadata,
	StyledPriority,
	StyledTaskTitle,
} from './Task.styles';

export default class Task extends React.Component {
	static get propTypes() {
		return {
			id: PropTypes.string.isRequired,
			summary: PropTypes.string.isRequired,
			description: PropTypes.string,
			instance: PropTypes.string.isRequired,
			reporter: PropTypes.shape({
				photo: PropTypes.string.isRequired,
				displayName: PropTypes.string.isRequired,
			}).isRequired,
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
		const { id, summary, priority, instance, reporter } = this.props;
		const { isExpanded } = this.state;
		return (
			<StyledTaskItem
				onClick={this.toggleExpandedView}
				isOpen={isExpanded}
				priority={priority}
			>
				<StyledTaskTitle isOpen={isExpanded}>
					[{id}] {summary}
				</StyledTaskTitle>
				<StyledTaskInterior isOpen={isExpanded}>
					<StyledTaskMetadata>
						<div>
							<StyledPriority>{priority}</StyledPriority>
							<StyledSubtext>{instance}</StyledSubtext>
						</div>

						<div>
							<StyledProfilePicture src={reporter.photo} />
							<p>{reporter.displayName}</p>
						</div>
					</StyledTaskMetadata>
					<div dangerouslySetInnerHTML={{ __html: this.props.description }} />
				</StyledTaskInterior>
			</StyledTaskItem>
		);
	}
}
