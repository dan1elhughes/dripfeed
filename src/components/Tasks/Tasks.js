import React from 'react';
import PropTypes from 'prop-types';
import bindMethods from 'yaab';
import styled from 'styled-components';

const StyledHeader = styled.h2`
	text-transform: uppercase;
	font-weight: normal;
`;

export default class Tasks extends React.Component {
	static get propTypes() {
		return {
			tasks: PropTypes.arrayOf(
				PropTypes.shape({
					key: PropTypes.string.isRequired,
					summary: PropTypes.string.isRequired,
				})
			).isRequired,
		};
	}

	constructor(props) {
		super(props);
		this.state = {};
		bindMethods(this);
	}

	render() {
		const { tasks } = this.props;
		return (
			<div className="Tasks">
				<StyledHeader>Tasks</StyledHeader>
				{tasks.map(task => (

				))}
				<pre>
					<code>{JSON.stringify(this.props, null, 4)}</code>
				</pre>
			</div>
		);
	}
}
