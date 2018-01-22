import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './actionTypes';

/**
 * @description Sets the logged in user
 * @param {object} user
 * @returns {void}
 */
export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		user
	};
}

/**
 * @description Logs user out
 * @returns {object}
 */
export function signOut() {
	return dispatch => {
		localStorage.removeItem('token');
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	};
}
