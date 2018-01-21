import { combineReducers } from 'redux';
import users from './reducers/users';
import notes from './reducers/notes';

export default combineReducers({
	users,
	notes
});
