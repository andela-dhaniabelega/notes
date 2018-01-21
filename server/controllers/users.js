import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validateInput from '../helpers/signUpValidation';
import validateUpdateInput from '../helpers/editProfileValidation';

require('dotenv').config();
const User = require('../models').User;
const Note = require('../models').Note;

const defaultRole = 2;
const LIMIT = 6;
const OFFSET = 0;

const UserController = {
	/**
	 * Handles POST /auth/users/login Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	logIn: (req, res) => {
		if (req.body.email && req.body.password) {
			User.findOne({ where: { email: req.body.email } })
				.then((user) => {
					if (user) {
						bcrypt.compare(req.body.password, user.dataValues.password, (err, match) => {
							const token = jwt.sign(
								{
									id: user.dataValues.id,
									firstName: user.dataValues.firstName,
									lastName: user.dataValues.lastName,
									email: user.dataValues.email,
									roleId: user.dataValues.roleId
								},
								process.env.SECRET_KEY,
								{ expiresIn: '23h' }
							);
							if (match) {
								res.send(200, {
									token
								});
							} else {
								res.status(401).json({ error: 'Invalid Credentials' });
							}
						});
					} else {
						res.status(401).json({ error: 'User not found' });
					}
				}).catch((err) => {
					res.status(500).json({ error: err.message });
				});
		} else {
			res.status(400).json({ error: 'Bad Request' });
		}
	},
	/**
	 * Handles POST /auth/users/ Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	createUser: (req, res) => {
		const { errors, isValid } = validateInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		User.findOne({ where: { email: req.body.userEmail } })
			.then((user) => {
				if (!user) {
					if (req.body.roleId === 1 || req.body.roleId > 2) {
						return res.status(403).json('Role cannot be directly assigned!');
					}
					User.create({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						email: req.body.userEmail,
						password: req.body.userPassword,
						roleId: req.body.roleId || defaultRole
					}).then((newuser) => {
						const token = jwt.sign(
							{
								id: newuser.dataValues.id,
								firstName: newuser.dataValues.firstName,
								lastName: newuser.dataValues.lastName,
								email: newuser.dataValues.email,
								roleId: newuser.dataValues.roleId
							},
							process.env.SECRET_KEY,
							{ expiresIn: '23h' }
						);
						res.send(200, {
							token,
							message: 'User Created Successfully'
						});
					}).catch((err) => {
						res.status(400).json({ error: err.message });
					});
				} else {
					return res.status(403).json({
						message: 'User already exists!',
					});
				}
			}).catch((err) => {
				res.status(401).json({ error: err.message });
			});
	},
	/**
	 * Handles GET /api/users/:id Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	getUser: (req, res) => {
		User.findOne({ where: { id: req.params.id } }).then((user) => {
			if (user) {
				return res.status(200).json(user);
			} else {
				return res.status(404).json({
					message: 'User Not Found',
				});
			}
		}).catch((err) => {
			res.status(404).json({ error: err.message });
		});
	},
	/**
	 * Handles GET /api/users/ Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	getAllUsers: (req, res) => {
		const limit = req.query.limit || LIMIT;
		const offset = req.query.offset || OFFSET;
		const userRole = req.decoded.roleId;
		if (userRole === 1) {
			User
				.findAndCountAll({
					limit,
					offset,
					order: [['createdAt', 'DESC']]
				})
				.then((users) => {
					if (!users) {
						res.status(404).send({
							message: 'Users Not Found',
						});
					}
					const pagination = {
						totalCount: users.count,
						pages: Math.ceil(users.count / limit),
						currentPage: Math.floor(offset / limit) + 1,
						pageSize: users.rows.length,
					};
					res.status(200).send({
						users: users.rows,
						pagination,
					});
				})
				.catch((err) => {
					res.status(400).send(err);
				});
		} else {
			res.status(403).json('Access Denied!');
		}
	},
	/**
	 * Handles PUT /api/users/:id Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	updateUser: (req, res) => {
		const userId = req.decoded.id;
		const { errors, isValid } = validateUpdateInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		User.findById(req.params.id).then((user) => {
			if (!user) {
				return res.status(404).json({
					message: 'User Not Found',
				});
			}
			if (userId === Number(req.params.id)) {
				if (req.body.email) {
					if (req.body.email === req.decoded.email) {
						return user.update({
							firstName: req.body.firstName || user.firstName,
							lastName: req.body.lastName || user.lastName,
							email: req.body.email || user.email,
							password: user.password,
							roleId: req.body.roleId || user.roleId,
							message: 'User updated Successfully'
						})
							.then(() => res.status(200).send(user))
							.catch(error => res.status(400).send(error));
					}
					User.find({ where: { email: req.body.email }
					}).then((foundEmail) => {
						if (foundEmail) {
							return res.status(403).json({
								message: 'Email already in use'
							});
						}
						user.update({
							firstName: req.body.firstName || user.firstName,
							lastName: req.body.lastName || user.lastName,
							email: req.body.email || user.email,
							password: user.password,
							roleId: req.body.roleId || user.roleId,
							message: 'User updated Successfully'
						})
							.then(() => res.status(200).send(user))
							.catch(error => res.status(400).send(error));
					});
				} else {
					user.update({
						firstName: req.body.firstName || user.firstName,
						lastName: req.body.lastName || user.lastName,
						email: req.body.email || user.email,
						password: user.password,
						roleId: req.body.roleId || user.roleId,
						message: 'User updated Successfully'
					})
						.then(() => res.status(200).send(user))
						.catch(error => res.status(400).send(error));
				}
			} else {
				res.status(403).json({
					message: 'Access Denied!'
				});
			}
		}).catch((err) => {
			res.status(404).json({ error: err.message });
		});
	},
	/**
	 * Handles DELETE /api/users/:id Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	deleteUser(req, res) {
		const userId = req.decoded.id;
		const userRole = req.decoded.roleId;
		if (userRole === 1 || userId === Number(req.params.id)) {
			User.findById(req.params.id).then((user) => {
				if (!user) {
					return res.status(404).json({
						message: 'User Not Found',
					});
				} else {
					User.destroy({
						where: {
							id: req.params.id
						}
					})
						.then(() => {
							return res.status(204).json({
								message: 'Account Deleted'
							});
						})
						.catch((err) => {
							res.status(500).json({ error: err.message });
						});
				}
			}).catch((err) => {
				res.status(500).json({ error: err.message });
			});
		} else {
			return res.status(403).json({
				message: 'Cannot delete user',
			});
		}
	},
	/**
	 * Handles POST /auth/users/ Route
	 * @param  {object} req [Incoming Request]
	 * @param  {object} res [Outgoing Response]
	 * @return {void}
	 */
	getUserNotes: (req, res) => {
		const limit = req.query.limit || LIMIT;
		const offset = req.query.offset || OFFSET;
		const userId = req.decoded.id;
		if (userId !== Number(req.params.id)) {
			return res.status(401).json({
				message: 'Wrong Move',
			});
		}
		Note
			.findAndCountAll({
				where: {
					userId: req.params.id,
				},
				order: [['createdAt', 'DESC']],
				limit,
				offset
			})
			.then((notes) => {
				if (!notes) {
					res.status(404).send({
						message: 'Notes Not Found',
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
					message: 'Bad Request. Please Try Again',
				});
			});
	}
};

module.exports = UserController;
