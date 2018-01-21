import React from 'react';
import PropTypes from 'prop-types';

const App = () => ({
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
});
App.propTypes = {
	children: PropTypes.element.isRequired
};
export default App;
