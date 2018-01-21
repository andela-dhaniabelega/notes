import React from 'react';

/**
 * @class MyNotes
 * @description Defines User Notes
 * @extends {React.Component}
 */
export class MyNotes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: ''
		};
	}

	render() {
		return (
			<div>
				<div className="toolbar">
					<h2 className="heading">My Notes</h2>
					<ul className="icons">
						<li className="create">
							<a href="#">
								<i className="fa fa-pencil-square-o fa-2x" aria-hidden="true" />
							</a>
						</li>
						<li className="trash">
							<a href="#">
								<i className="fa fa-trash-o fa-2x" aria-hidden="true" />
							</a>
						</li>
					</ul>

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

				</div>

				<div className="notes">

				</div>
			</div>
		);
	}
}

export default MyNotes;
