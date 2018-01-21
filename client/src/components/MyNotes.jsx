import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { userNotes } from '../actions/userNotes';
import { newNote } from '../actions/newNote';
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
			id: this.props.user.user.id
		};
		this.saveNote = this.saveNote.bind(this);
		this.onChange = this.onChange.bind(this);
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
	/**
	 * Open Editor for a new note
	 */
	saveNote() {
		console.log('here');
		this.props.newNote(this.state).then(() => {
			this.props.userNotes(this.state);
			console.log('New Note Created');
		}).catch((err) => {
			console.log(err);
		});
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
									<NoteCard
										limit={this.state.limit}
										offset={this.state.offset}
										note={note}
										key={note.id}
									/>
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
					>
						{this.state.content}
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
		pagination: state.notes.pagination
	};
}
export default withRouter(connect(mapStateToProps, { userNotes, newNote })(MyNotes));
