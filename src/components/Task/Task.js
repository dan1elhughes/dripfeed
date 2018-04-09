import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import bindMethods from 'yaab';

import { colour } from '../../styles/variables';

const StyledTaskItem = styled.p`
	border-bottom: 3px solid ${colour.background.fill};
	margin: 0;
	padding: 0.5em 0;
`;

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
				<StyledTaskItem>
					[{id}] {summary}
				</StyledTaskItem>
			</div>
		);
	}
}
