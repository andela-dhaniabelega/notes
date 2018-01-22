import axios from 'axios';
import { DELETE_NOTE } from './actionTypes';

export const setRemoveNote = (noteId) => {
	return {
		type: DELETE_NOTE,
		noteId
	};
};

/**
 * @param  {object} noteId
 * @return {function} dispatch
 */
export const deleteNote = (noteId) => {
	return dispatch => {
		return axios.delete(`/api/v1/notes/${noteId}`).then((res) => {
			dispatch(setRemoveNote(noteId));
			return Promise.resolve(res);
		});
	};
};
