import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, Link } from 'react-router'
const DudeList = require('./modules/DudeList/DudeList');


class PageNotFound extends React.Component {
	render() {
		return (
			<div>
				<h1>Sorry, we couldn't find that page</h1>
			</div>
		);
	}
}


render(
	(
		<Router history={browserHistory}>
			<Route path="/" component={ DudeList } />
			<Route path="*" component={PageNotFound} />
		</Router>
	),
	document.getElementById('main')
);