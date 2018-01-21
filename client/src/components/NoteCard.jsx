import React from 'react';

export class NewNote extends React.Component {
	constructor(props) {
		super(props);
	}

	/**
	 * Render to DOM
	 * @returns {void}
	 */
	render() {
		return (
			<div>
				<li className="notes-preview selected">
					<div className="notes-preview-title">{this.props.note.content}</div>
					<p className="notes-preview-content">&nbsp;</p>
				</li>
			</div>
		);
	}
}
export default NewNote;
