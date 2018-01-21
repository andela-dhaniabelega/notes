// import Validator from 'validator';
// import isEmpty from 'lodash/isEmpty';

const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');
/**
 * @description Validates Sign Up form
 * @param  {object} formData
 * @return {object}
 */
export default function signUpValidation(formData) {
	const errors = {};
	if (Validator.isEmpty(formData.firstName)) {
		errors.firstName = 'First Name is Required';
	}
	if (Validator.isEmpty(formData.lastName)) {
		errors.lastName = 'Last Name is Required';
	}
	if (Validator.isEmpty(formData.userEmail)) {
		errors.userEmail = 'Email is Required';
	}
	if (!Validator.isEmail(formData.userEmail)) {
		errors.userEmail = 'Email is invalid';
	}
	if (Validator.isEmpty(formData.userPassword)) {
		errors.password = 'Password is Required';
	}
	if (Validator.isEmpty(formData.passwordConfirm)) {
		errors.passwordConfirm = 'Password Confirmation is Required';
	}
	if (!Validator.equals(formData.userPassword, formData.passwordConfirm)) {
		errors.passwordConfirm = 'Passwords must match';
	}
	if (!Validator.isLength(formData.userPassword, { min: 6, max: 100 })) {
		errors.userPassword = 'Password must be minimum of 6 characters';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}
