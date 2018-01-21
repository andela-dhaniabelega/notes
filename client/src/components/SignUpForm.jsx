import React from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import signUpValidation from '../../../server/helpers/signUpValidation';

/**
 * @class SignUpForm
 * @description Component to render Sign Up Form
 * @extends {React.Component}
 */
export class SignUpForm extends React.Component {
	/**
	 * @description Creates and intializes objects
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			userEmail: '',
			userPassword: '',
			passwordConfirm: '',
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
			this.props.signUp(this.state).then(
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
		const { errors, isValid } = signUpValidation(this.state);
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
				<h1>Sign Up</h1>
				<div className="form-group">
					<label htmlFor="firstName">First Name</label>
					<input
						type="text"
						className="form-control"
						id="firstName"
						name="firstName"
						placeholder="First Name"
						value={this.state.firstName}
						onChange={this.onChange}
					/>
					<span className="sign-up-error">{errors.firstName}</span>
				</div>
				<div className="form-group">
					<label htmlFor="lastName">Last Name</label>
					<input
						type="text"
						className="form-control"
						id="lastName"
						name="lastName"
						placeholder="Last Name"
						value={this.state.lastName}
						onChange={this.onChange}
					/>
					<span className="sign-up-error">{errors.lastName}</span>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						className="form-control"
						id="user-email"
						name="userEmail"
						placeholder="Email"
						value={this.state.userEmail}
						onChange={this.onChange}
					/>
					<span className="sign-up-error">{errors.email}</span>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						className="form-control"
						id="user-password"
						name="userPassword"
						placeholder="Password"
						value={this.state.userPassword}
						onChange={this.onChange}
					/>
					<span className="sign-up-error">{errors.password}</span>
				</div>
				<div className="form-group">
					<label htmlFor="passwordConfirm">Confirm Password</label>
					<input
						type="password"
						className="form-control"
						id="passwordConfirm"
						name="passwordConfirm"
						placeholder="Confirm Password"
						value={this.state.passwordConfirm}
						onChange={this.onChange}
					/>
					<span className="sign-up-error">{errors.passwordConfirm}</span>
				</div>
				<button
					type="submit"
					className="btn btn-primary"
					id="button-signin"
					onClick={this.onSubmit}
				> Sign Up
				</button>
			</div>
		);
	}
}
SignUpForm.propTypes = {
	signUp: propTypes.func.isRequired,
	history: propTypes.shape({
		push: propTypes.func.isRequired,
	}).isRequired
};
export default withRouter(SignUpForm);

