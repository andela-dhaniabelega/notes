// import Auth from '../middleware/authentication';

const Auth = require('../middleware/authentication')
const Note = require('../models').Note;
const Role = require('../models').Role;

const LIMIT = 6;
const OFFSET = 0;

const NoteController = {
/**
 	* Route: POST: /notes
 	* @param  {object} req [request object parameter]
 	* @param  {object} res [response object paramter]
 	* @return {void}    returns a response object
 	*/
	createNote: (req, res) => {
		const note = {
			content: req.body.content,
			userId: req.decoded.id,
			userRoleId: req.decoded.roleId,
		};
		Note.create(note)
			.then((createdNote) => {
				res.status(200).send({
					createdNote,
					message: 'Note Created Successfully'
				});
			})
			.catch(() => {
				res.status(400).send({
					message: 'Could not create note. Pls try later'
				});
			});
	},
	/**
	 * Handles GET /api/note/:id Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	getNote: (req, res) => {
		const noteId = req.params.id;
		const userRole = req.decoded.roleId;
		const userId = req.decoded.id;
		Note.findById(noteId)
			.then((foundNote) => {
				if (foundNote) {
					if (userId === foundNote.userId || Auth.isAdmin(userRole)){
						res.status(200).send({
							foundNote,
						});
					} else {
						res.status(403).send({
							message: 'Access Denied'
						});
					}
				} else {
					res.status(404).send({
						message: 'Note Not Found'
					});
				}
			})
			.catch(() => {
				res.status(400).send({
					message: 'Bad Request. Please Try Later'
				});
			});
	},
	/**
	 * Handles GET /api/notes/ Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	getAllNotes: (req, res) => {
		const limit = req.query.limit || LIMIT;
		const offset = req.query.offset || OFFSET;
		const userRole = req.decoded.roleId;
		Role.findById(userRole)
			.then((role) => {
				if (role.roleName === 'admin') {
					Note
						.findAndCountAll({
							limit,
							offset,
							order: [['createdAt', 'DESC']]
						})
						.then((notes) => {
							if (!notes) {
								res.status(404).send({
									message: 'There are currently 0 notes',
								});
							}
							const pagination = {
								totalCount: notes.count,
								pages: Math.ceil(notes.count / limit),
								currentPage: Math.floor(offset / limit) + 1,
								pageSize: notes.rows.length,
							};
							res.status(200).send({
								notes: notes.rows,
								pagination,
							});
						})
						.catch(() => {
							res.status(400).send({
								message: 'Bad Request. Please Try Later'
							});
						});
				} else {
					res.status(403).send({
						message: 'Access Denied'
					});
				} 
			}).catch(() => {
				res.status(400).send({
					message: 'Bad Request. No user Role'
				});
			});
	},
	/**
	 * Handles PUT /note/:id Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	updateNote: (req, res) => {
		const userId = req.decoded.id;
		Note.findById(req.params.id).then((foundNote) => {
			if (foundNote) {
				if (userId === foundNote.userId) {
					return foundNote.update({
						content: req.body.content || foundNote.content,
						userRoleId: foundNote.userRoleId,
						userId: foundNote.userId,
						message: 'Note Updated Successfully'
					})
						.then(() => res.status(200).send(foundNote))
						.catch(error => res.status(400).send(error));
				}
				res.status(403).send({
					message: 'Access Denied'
				});
			} else {
				return res.status(404).send({
					message: 'Note Not Found',
				});
			}
		}).catch(() => {
			res.status(404).send({
				message: 'Could not find note to update'
			});
		});
	},
	/**
	 * Handles DELETE /note/:id Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	deleteNote: (req, res) => {
		const userId = req.decoded.id;
		const userRole = req.decoded.roleId;
		Note.findById(req.params.id).then((foundNote) => {
			if (foundNote) {
				if (userRole === 1 || userId === foundNote.userId) {
					Note.destroy({
						where: {
							id: req.params.id
						}
					})
						.then(() => {
							return res.status(200).json({
								message: 'Note Deleted',
							});
						})
						.catch(() => {
							res.status(500).send({
								message: 'Could not delete. Please Try Later'
							});
						});
				} else {
					return res.status(403).json({
						message: 'Access Denied',
					});
				}
			} else {
				return res.status(404).json({
					message: 'Note Not Found',
				});
			}
		});
	}
};

module.exports = NoteController;
