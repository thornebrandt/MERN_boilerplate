let React = require('react');
let ReactDOM = require('react-dom');
let Router = require('react-router').Router;
let Route = require('react-router').Route;
let Redirect = require('react-router').Redirect;

let DudeList = require('./modules/DudeList/DudeList');


let NoMatch = React.createClass({
	render(){
		return (
			<h2>Sorry, we could not find that page.</h2>
		);
	}
});


ReactDOM.render(
	(
		<Router>
			<Route path="/dudes" component={DudeList} />
			<Redirect from="/" to="/dudes" />
			<Route path="*" component={NoMatch} />
		</Router>
	),
	document.getElementById('main')
);