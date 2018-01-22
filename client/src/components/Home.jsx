import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { signUp } from '../actions/signUpAction';
import { signIn } from '../actions/signInAction';

const Home = () => ({
	render() {
		return (
				<div id="main-c">
					<div className="jumbotron jumb-grad">
						<ul className="rotator">
							<li><h1 className="display-3">Welcome to Notes App</h1></li>
							<li><h1 className="display-3">Remember Everything</h1></li>
							<li><h1 className="display-3">Get Organized</h1></li>
							<li><h1 className="display-3">It&apos;s Elegant</h1></li>
							<li><h1 className="display-3">Get Organized</h1></li>
						</ul>
						<p className="lead sub-title">This is a simple note taking app. The design lean, elegant and easy to use. Note app will help improve your productivity.</p>
						<hr className="my-4" />
						<p>Design by Dhani Abelega. Built with Nodejs, React/Redux</p>
						<p className="lead">
							<a className="btn btn-primary btn-lg" href="#" role="button">About me</a>
						</p>
					</div>
					<div className="container">
						<div className="signup">
							<div className="card">
								<div className="card-header">Sign Up</div>
								<div className="card-block">
									<SignUpForm signUp={this.props.signUp} />
								</div>
							</div>
						</div>
						<div className="home-border"></div>
						<div className="signin">
							<div className="card">
								<div className="card-header">Sign In</div>
								<div className="card-block">
									<SignInForm signIn={this.props.signIn} />
								</div>
							</div>
						</div>
					</div>
				</div>
		);
	}
});

Home.propTypes = {
	signUp: propTypes.func.isRequired,
	signIn: propTypes.func.isRequired
};
export default connect(null, { signIn, signUp })(Home);
