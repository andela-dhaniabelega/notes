import axios from 'axios';
import { EDIT_NOTE } from './actionTypes';

export const setEditNote = (note) => {
	return {
		type: EDIT_NOTE,
		note
	};
};

/**
 * @param  {object} note
 * @return {function} dispatch
 */
export const editNote = (note) => {
	return dispatch => {
		return axios.put(`/api/v1/notes/${note.editId}`, note).then((res) => {
			dispatch(setEditNote(res.data));
			return Promise.resolve(res);
		});
	};
};
