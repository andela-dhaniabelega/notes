import React from 'react';

export class Settings extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			firstName: ''
		};
	}

	render() {
		return(
			<div>
				<div className="toolbar">
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
								<a href="/mynotes" className="dropdown-item" type="button">My Notes</a>
								<a href="/settings" className="dropdown-item" type="button">Log Out</a>
							</div>
						</div>
					</div>
				</div>
				<div className="settings">
					<h1 className="title">Settings</h1>

					<div className="subheading">
						<div className="left">
							<h3>First Name</h3>
						</div>
						<div className="right">
							<a href="">Edit</a>
						</div>
					</div>
					<div className="desc">
						<div className="left">
							<h5>Your registered first name</h5>
						</div>
						<div className="right">
							Celestine
						</div>
					</div>

					<div className="subheading">
						<div className="left">
							<h3>Last Name</h3>
						</div>
						<div className="right">
							<a href="">Edit</a>
						</div>
					</div>
					<div className="desc">
						<div className="left">
							<h5>Your registered last name</h5>
						</div>
						<div className="right">
							Okoro
						</div>
					</div>

					<div className="subheading">
						<div className="left">
							<h3>Email</h3>
						</div>
						<div className="right">
							<a href="">Edit</a>
						</div>
					</div>
					<div className="desc">
						<div className="left">
							<h5>Your registered email</h5>
						</div>
						<div className="right">
							celestine.okoro@gmail.com
						</div>
					</div>

					<div className="subheading">
						<div className="left">
							<h3>Password</h3>
						</div>
						<div className="right">
							<a href="">Edit</a>
						</div>
					</div>
					<div className="desc">
						<div className="left">
							<h5>Your Password</h5>
						</div>
					</div>

					<div className="subheading">
						<div className="left">
							<h3>Delete Account</h3>
						</div>
						<div className="right">
							<a href="">Delete</a>
						</div>
					</div>
					<div className="desc">
						<div className="left">
							<h5>Delete your account</h5>
						</div>
					</div>

					<div className="go_back">
						<h3>
							<span className="back_text"><a href="/mynotes">Back to notes</a></span>
						</h3>
					</div>
				</div>
			</div>
		);
	}
}

export default Settings;
