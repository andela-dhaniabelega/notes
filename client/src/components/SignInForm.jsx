import React from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import signInValidation from '../../../server/helpers/signInValidation';

/**
 * @class SignInForm
 * @description Component to render Sign In Form
 * @extends {React.Component}
 */
export class SignInForm extends React.Component {
	/**
	 * @description Creates and intializes objects
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	/**
	 * @description Allows user Interact with Input boxes
	 * @param  {object} e
	 * @return {void}
	 */
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	/**
	 * @description Triggers action to sign up users
	 * @param  {object} e
	 * @return {void}
	 */
	onSubmit() {
		if (this.validateForm()) {
			this.setState({ errors: {} });
			this.props.signIn(this.state).then(
				() => {
					this.props.history.push('/mynotes');
				},
				(err) => {
					this.setState({ errors: err.response.data });
					// Materialize.toast(err.response.data.message, 4000);
				}
			);
		}
	}
	/**
	 * @description Checks that form is valid
	 * @return {Boolean}
	 */
	validateForm() {
		const { errors, isValid } = signInValidation(this.state);
		if (!isValid) {
			this.setState({ errors });
		}
		return isValid;
	}
	/**
	 * @description Renders content to the screen
	 * @return {void}
	 */
	render() {
		let errors = {};
		if (this.state.errors !== null) {
			errors = this.state.errors;
		}
		return (
			<div>
				<h1>Sign In Form</h1>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						className="form-control"
						id="email"
						placeholder="Email"
						value={this.state.email}
						onChange={this.onChange}
					/>
					<span className="sign-in-error">{errors.email}</span>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						className="form-control"
						id="password"
						placeholder="Another input"
						value={this.state.password}
						onChange={this.onChange}
					/>
					<span className="sign-in-error">{errors.email}</span>
				</div>
				<button
					type="submit"
					className="btn btn-primary"
					onClick={this.onSubmit}
				> Sign In
				</button>
			</div>
		);
	}
}
SignInForm.propTypes = {
	signIn: propTypes.func.isRequired,
	history: propTypes.shape({
		push: propTypes.func.isRequired,
	}).isRequired
};
export default withRouter(SignInForm);

