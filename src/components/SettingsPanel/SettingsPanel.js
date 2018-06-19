import React from 'react';
import PropTypes from 'prop-types';
import bindMethods from 'yaab';

import {
	StyledHeader,
	StyledPanel,
	StyledPullTab,
} from './SettingsPanel.styles';

import Account from '../Account/Account';
import Modal from '../Modal/Modal';

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
			form: {},
			isOpen: false,
			modalIsVisible: false,
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

	showAccountAddModal(type) {
		this.setState(({ form }) => ({
			modalIsVisible: true,
			form: {
				...form,
				type,
			},
		}));
	}

	closeModal() {
		this.setState({
			modalIsVisible: false,
		});
	}

	addAccount() {
		this.setState(({ settings, form }) => ({
			settings: [...settings, form],
			form: {},
			modalIsVisible: false,
		}));
	}

	deleteAccount(account) {
		if (window.confirm(`Disconnect ${account.name}?`)) {
			this.setState(({ settings }) => ({
				settings: settings.filter(_ => _.name !== account.name),
			}));
		}
	}

	save() {
		this.setState(
			{
				isOpen: false,
			},
			() => this.props.onChange(this.state.settings)
		);
	}

	handleFormChange(event) {
		const { target } = event;
		const { name, value } = target;
		this.setState(({ form }) => ({
			form: {
				...form,
				[name]: value,
			},
		}));
	}

	render() {
		return (
			<React.Fragment>
				<StyledPanel isOpen={this.state.isOpen}>
					<StyledPullTab onClick={this.toggleOpen} isOpen={this.state.isOpen} />
					{this.state.settings.map((account, i) => (
						<Account
							key={i}
							type={account.type}
							name={account.name}
							onClick={() => this.deleteAccount(account)}
						/>
					))}
					<Account
						type="jira"
						onClick={() => this.showAccountAddModal('jira')}
					/>
					<Account
						type="bitbucket"
						onClick={() => this.showAccountAddModal('bitbucket')}
					/>
					{this.state.settings.filter(account => account.type === 'forecast')
						.length === 0 && (
						<Account
							type="forecast"
							onClick={() => this.showAccountAddModal('forecast')}
						/>
					)}
					<button onClick={this.save}>Save</button>
				</StyledPanel>
				<Modal isVisible={this.state.modalIsVisible}>
					<StyledHeader>Add account</StyledHeader>
					<p>
						<input
							onChange={this.handleFormChange}
							type="text"
							name="name"
							placeholder="Name"
						/>
					</p>
					<p>
						<input
							onChange={this.handleFormChange}
							type="text"
							name="base"
							placeholder="API base"
						/>
					</p>
					<p>
						<input
							onChange={this.handleFormChange}
							type="text"
							name="username"
							placeholder="Username"
						/>
					</p>
					<p>
						<input
							onChange={this.handleFormChange}
							type="password"
							name="password"
							placeholder="Password"
						/>
					</p>
					<button onClick={this.addAccount}>Add account</button>
					<button onClick={this.closeModal}>Cancel</button>
				</Modal>
			</React.Fragment>
		);
	}
}
