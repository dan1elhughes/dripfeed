import React from 'react';
import PropTypes from 'prop-types';
import bindMethods from 'yaab';

export default class Task extends React.Component {
	static get propTypes() {
		return {
			id: PropTypes.string.isRequired,
			summary: PropTypes.string.isRequired,
		};
	}

	constructor(props) {
		super(props);
		this.state = {};
		bindMethods(this);
	}

	render() {
		const { id, summary } = this.props;
		return (
			<div className="Task">
				<p>
					[{id}] {summary}
				</p>
			</div>
		);
	}
}
