import 'whatwg-fetch';
const React = require('react');
const ReactDOM = require('react-dom');
const PostList = require('../Post/PostList');
let Dude = React.createClass({
	render(){
		let dudeContent;
		let foundDude = this.state.foundDude;
		let name = this.props.params.name;
		if(this.state.loaded){
			dudeContent = (
				<div>
					{foundDude && <FoundDude dude={this.state.dude} />}
					{!foundDude && <EmptyDude name={name} />}
				</div>
			);
		} else {
			dudeContent = (
				<div>
					Loading...
				</div>
			);
		}
		return(
			<div>
				{ dudeContent }
			</div>
		);
	},

	getInitialState(){
		return {
			loaded: false
		}
	},

	componentDidMount(){
		this.loadData();
	},

	loadData: function(){
		return fetch('/api/dudes/' + this.props.params.name)
		.then((response) => response.json())
		.then((data) => {
			let state = {
				loaded: true
			};
			if(data){
				state.dude = data;
				state.foundDude = true;
			} else {
				state.foundDude = false;
			}
			this.setState(state);
		})
		.catch((error) => {
			console.log("can't find dude", error);
		});
	}
});

let FoundDude = React.createClass({
	render(){
		return(
			<div>
				We found the dude: { this.props.dude.name }
				<h1>{this.props.dude.name}</h1>
				<h2>{this.props.dude.saying}</h2>
				<hr />
				<h2>Posts:</h2>
				<PostList />
			</div>
		);
	}
});


let EmptyDude = React.createClass({
	render(){
		return(
			<div>
				Sorry, we couldn't find that dude { this.props.name }
			</div>
		);
	}
});


module.exports = Dude;