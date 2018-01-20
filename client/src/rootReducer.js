import { combineReducers } from 'redux';
import users from './reducers/users';
import documents from './reducers/documents';

export default combineReducers({
	users,
	documents
});
