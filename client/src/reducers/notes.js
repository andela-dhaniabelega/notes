import { CREATE_NEW_NOTE,
	GET_USER_NOTES } from '../actions/actionTypes';

const initialState = {
	notes: [],
	note: {},
	pagination: {},
};
export default (state = initialState, action) => {
	switch (action.type) {
	case CREATE_NEW_NOTE: {
		const { notes = [] } = state;
		const updatedList = [action.note, ...notes];
		return Object.assign({}, state, { notes: updatedList });
	}
	case GET_USER_NOTES:
		return Object.assign(
			{},
			state,
			{ notes: action.notes, pagination: action.pagination }
		);
	default: return state;
	}
};

