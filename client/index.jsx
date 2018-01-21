import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { isAuthenticated, isAdmin } from './src/utils/verify';
import { setCurrentUser } from './src/actions/signInAction';
import App from './src/components/App';
import Home from './src/components/Home';
import MyNotes from './src/components/MyNotes';
import Settings from './src/components/Settings';
import configureStore from './src/utils/configureStore';
import setAuthorizationToken from './src/utils/setAuthorizationToken';
import './src/public/css/styles.scss';


const history = createBrowserHistory();
const store = configureStore();

if (localStorage.token) {
	setAuthorizationToken(localStorage.token);
	store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));
}

render(
	<Provider store={store}>
		<Router history={history}>
			<App>
				<Switch>
					<Route
						exact
						path="/"
						render={() => (
							isAuthenticated() ? (<Redirect to="/mynotes" />) : (<Home />)
						)}
					/>
					<Route
						exact
						path="/mynotes"
						render={() => (
							isAuthenticated() ? (<MyNotes />) : (<Redirect to="/" />)
						)}
					/>
					<Route
						exact
						path="/settings"
						render={() => (
							isAuthenticated() ? (<Settings />) : (<Redirect to="/" />)
						)}
					/>
				</Switch>
			</App>
		</Router>
	</Provider>
	, document.getElementById('app')
);
