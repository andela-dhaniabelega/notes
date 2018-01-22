import axios from 'axios';
import { CREATE_NEW_NOTE } from './actionTypes';

export const setNewNote = (note) => {
	return {
		type: CREATE_NEW_NOTE,
		note
	};
};


/**
 * @param  {object} content
 * @return {function} dispatch
 */
export const newNote = (content) => {
	return dispatch => {
		return axios.post('/api/v1/notes', content).then((res) => {
			dispatch(setNewNote(res.data.createdNote));
			return Promise.resolve(res);
		});
	};
};

