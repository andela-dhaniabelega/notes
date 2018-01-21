import axios from 'axios';
import { GET_USER_NOTES } from './actionTypes';

/**
 * @param {object} notes
 * @param  {object} pagination
 * @return {object}
 */
export const setUserNotes = (notes, pagination) => {
	return {
		type: GET_USER_NOTES,
		notes,
		pagination
	};
};

/**
 * @param  {object} params
 * @return {function} dispatch
 */
export const userNotes = (params) => {
	return dispatch => {
		return axios.get(`/api/v1/users/${params.id}/notes?offset=${params.offset}`).then((res) => {
			dispatch(setUserNotes(res.data.notes, res.data.pagination));
			return Promise.resolve(res);
		});
	};
};
