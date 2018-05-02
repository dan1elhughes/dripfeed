import React from 'react';
import PropTypes from 'prop-types';
import bindMethods from 'yaab';
import styled from 'styled-components';

import Account from '../Account/Account';

const width = 400;

const StyledPanel = styled.div`
	background: black;
	color: white;
	position: fixed;
	top: 0;
	right: 0;
	width: ${width}px;
	transition: transform 0.25s;
	transform: translateX(${props => (props.isOpen ? '0px' : `${width}px`)});
`;

const StyledPullTab = styled.div`
	background: black;
	color: white;
	position: absolute;
	left: -50px;
	font-size: 40px;
	width: 30px;
	height: 30px;
	padding: 10px;
	transform: rotate(${props => (props.isOpen ? '180deg' : '0deg')});
`;

export default class SettingsPanel extends React.Component {
	static get propTypes() {
		return {
			settings: PropTypes.array.isRequired,
			onChange: PropTypes.func.isRequired,
		};
	}

	constructor(props) {
		super(props);

		const { settings } = props;

		this.state = {
			settings,
			isOpen: true,
		};

		bindMethods(this);
	}

	componentWillReceiveProps(props) {
		const { settings } = props;
		this.setState({
			settings,
		});
	}

	toggleOpen() {
		this.setState(({ isOpen }) => ({
			isOpen: !isOpen,
		}));
	}

	addAccount(type) {
		console.log('show modal for', type);
	}

	deleteAccount(account) {
		if (window.confirm(`Disconnect ${account.name}?`)) {
			console.log('Delete', account.name);
		}
	}

	render() {
		return (
			<StyledPanel isOpen={this.state.isOpen}>
				<StyledPullTab onClick={this.toggleOpen} isOpen={this.state.isOpen}>
					&lsaquo;
				</StyledPullTab>
				{this.state.settings.map((account, i) => (
					<Account
						key={i}
						type={account.type}
						name={account.name}
						onClick={() => this.deleteAccount(account)}
					/>
				))}
				<Account type="jira" onClick={() => this.addAccount('jira')} />
				<Account
					type="bitbucket"
					onClick={() => this.addAccount('bitbucket')}
				/>
				<pre>
					<code>{JSON.stringify(this.state, null, 4)}</code>
				</pre>
			</StyledPanel>
		);
	}
}
