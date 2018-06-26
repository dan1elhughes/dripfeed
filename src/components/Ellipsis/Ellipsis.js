import React from 'react';
import styled from 'styled-components';
import bindMethods from 'yaab';

const StyledEllipsis = styled.span`
	width: 1px;
	overflow: visible;
	display: inline-block;
`;

export default class Ellipsis extends React.Component {
	constructor(props) {
		super(props);
		this.state = { count: 2 };
		bindMethods(this);
	}

	increment() {
		this.setState(({ count }) => ({
			count: count >= 4 ? 2 : count + 1,
		}));
	}

	componentDidMount() {
		this._tick = setInterval(this.increment, 1000);
	}

	componentWillUnmount() {
		clearInterval(this._tick);
	}

	render() {
		const { count } = this.state;
		return (
			<StyledEllipsis className="Ellipsis">
				{Array(count)
					.fill('.')
					.join('')}
			</StyledEllipsis>
		);
	}
}
