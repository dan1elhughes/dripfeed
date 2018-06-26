import React from 'react';
import bindMethods from 'yaab';

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
			<span className="Ellipsis">
				{Array(count)
					.fill('.')
					.join('')}
			</span>
		);
	}
}
