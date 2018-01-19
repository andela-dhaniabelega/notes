const Roles = require('../controllers/roles');
const Users = require('../controllers/users');
const Notes = require('../controllers/notes');

module.exports = (app) => {
	app.get('/api/', (req, res) => res.status(200).send({
		message: 'Welcome to the Notes API!',
	}));

	// Roles
	app.post('/api/v1/roles', Roles.createRole);

	// Users
	app.post('/auth/v1/users', Users.createUser);
	app.get('/api/v1/users/:id', Users.getUser);
	app.get('/api/v1/users/', Users.getAllUsers);
	app.put('/api/v1/users/:id', Users.updateUser);
	app.delete('/api/v1/users/:id', Users.deleteUser);
	app.post('/auth/v1/users/login', Users.logIn);
	app.get('/api/v1/users/:id/notes', Users.getUserNotes);

	// // Notes
	app.post('/api/v1/notes', Notes.createNote);
	app.get('/api/v1/notes', Notes.getAllNotes);
	app.get('/api/v1/notes/:id', Notes.getNote);
	app.put('/api/v1/notes/:id', Notes.updateNote);
	app.delete('/api/v1/notes/:id', Notes.deleteNote);
};
