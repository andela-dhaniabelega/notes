// import Validator from 'validator';
// import isEmpty from 'lodash/isEmpty';

const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

/**
 * @description Validates Profile Update form
 * @param  {object} formData
 * @return {object}
 */
const editProfileValidation = function(formData) {
	const errors = {};
	if (formData.firstName){
		if (Validator.isEmpty(formData.firstName)) {
			errors.firstName = 'First Name is Required';
		}
	}
	if (formData.lastName){	
		if (Validator.isEmpty(formData.lastName)) {
			errors.lastName = 'Last Name is Required';
		}
	}
	if(formData.email){
		if (Validator.isEmpty(formData.email)) {
			errors.email = 'Email is Required';
		}
		if (!Validator.isEmail(formData.email)) {
			errors.email = 'Email is invalid';
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
}
module.exports = editProfileValidation
