import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { userNotes } from '../actions/userNotes';
import { newNote } from '../actions/newNote';
import { editNote } from '../actions/editNote';
import { deleteNote } from '../actions/deleteNote';
import NoteCard from './NoteCard';

/**
 * @class MyNotes
 * @description Defines User Notes
 * @extends {React.Component}
 */
export class MyNotes extends React.Component {
	/**
	 * @description cerates and intializes objects
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			offset: 0,
			id: this.props.user.user.id,
			editId: 0,
			deleteId: 0
		};
		this.saveNote = this.saveNote.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleSingleNote = this.handleSingleNote.bind(this);
	}

	/**
	 * @description Lifecycle Method
	 * Called when an instance of the component
	 * is created or inserted into the DOM
	 * @return {void}
	 */
	componentDidMount() {
		this.props.userNotes(this.state);
	}

	/**
	 * @description Lifecycle Method
	 * Called before a mounted component receives props
	 * @param {object} [nextProps]
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		this.setState({ notes: nextProps.notes });
	}

	/**
	 * Event handler for textarea
	 * @param  {object} e
	 * @return {void}
	 */
	onChange(e) {
		this.setState({ content: e.target.value });
	}
	handleSingleNote(param) {
		this.setState({
			content: param.content,
			editId: param.id,
			deleteId: param.id
		});
	}
	/**
	 * Open Editor for a new note
	 */
	saveNote() {
		if (this.state.editId !== 0) {
			this.props.editNote(this.state).then(() => {
				this.props.userNotes(this.state);
				this.setState({ editId: 0 });
			}).catch((err) => {
				console.log(err);
			});
		} else {
			this.props.newNote(this.state).then(() => {
			this.props.userNotes(this.state);
			console.log('New Note Created');
			}).catch((err) => {
				console.log(err);
			});
		}
	}

	render() {
		const emptyNotes = (
			<li className="notes-preview">
				<div className="notes-preview-title">No Notes</div>
			</li>
		);
		return (
			<div>
				<div className="toolbar">
					<h2 className="heading">My Notes</h2>
					<div className="icons">
						<li className="create">
							<a role="button" onClick={this.createNote}>
								<i className="fa fa-pencil-square-o fa-lg" aria-hidden="true" />
							</a>
						</li>
						<li className="trash">
							<a role="button">
								<i className="fa fa-trash-o fa-lg" aria-hidden="true" />
							</a>
						</li>
						<li className="save">
							<a role="button" onClick={this.saveNote}>
								<i className="fa fa-floppy-o fa-lg" aria-hidden="true" />
							</a>
						</li>
					</div>

					<div className="navigation">
						<div className="dropdown">
							<a
								className="dropdown-toggle"
								id="dropdownMenu2"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Celestine Okoro
							</a>
							<div className="dropdown-menu" aria-labelledby="dropdownMenu2">
								<a href="/settings" className="dropdown-item" type="button">Settings</a>
								<a href="/settings" className="dropdown-item" type="button">Log Out</a>
							</div>
						</div>
					</div>
				</div>

				<div className="sidebar">
					<ul className="notes-preview-container">
						{(this.state.notes)
									&& (this.state.notes.length === 0)
							? emptyNotes : (
								this.props.notes.map(note => (
									<a role="button" className="note-card" onClick={() => this.handleSingleNote(note)}>
										<li className="notes-preview selected">
											<div className="notes-preview-title">
												{note.content}
											</div>
											<p className="notes-preview-content">&nbsp;</p>
										</li>
									</a>
								))
							)}
					</ul>
				</div>

				<div className="notes">
					<textarea
						name=""
						id="txtarea"
						cols="30"
						rows="10"
						className="content"
						onChange={this.onChange}
						value={this.state.content}
					>
					</textarea>
				</div>
			</div>
		);
	}
}
MyNotes.propTypes = {
	notes: propTypes.arrayOf(propTypes.shape({
		content: propTypes.string.isRequired,
		map: propTypes.func,
		length: propTypes.number
	}).isRequired).isRequired,
	userNotes: propTypes.func.isRequired,
	pagination: propTypes.shape({
		pages: propTypes.number
	}).isRequired,
};
/**
 * @description Maps State to Props
 * @param  {object} state
 * @return {void}
 */
function mapStateToProps(state) {
	return {
		user: state.users,
		notes: state.notes.notes,
		note: state.notes.note,
		pagination: state.notes.pagination
	};
}
export default withRouter(connect(mapStateToProps, { userNotes, newNote, editNote, deleteNote })(MyNotes));
