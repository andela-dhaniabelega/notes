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
			<div>
				<h1>The Home Page</h1>
				<div className="container">
					<div className="col col-sm-2"><SignUpForm signUp={this.props.signUp} /></div>
					<div className="col col-sm-2"><SignInForm signIn={this.props.signIn} /></div>
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
