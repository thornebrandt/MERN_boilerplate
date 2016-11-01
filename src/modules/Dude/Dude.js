import 'whatwg-fetch';
const React = require('react');
const ReactDOM = require('react-dom');
const PostList = require('../Post/PostList');
const PostAdd = require('../Post/PostAdd');

let Dude = React.createClass({
	getInitialState(){
		return {
			foundDude: false,
			loaded: false
		}
	},

	render(){
		let dudeContent;
		let foundDude = this.state.foundDude;
		let name = this.props.params.name;
		if(this.state.loaded){
			dudeContent = (
				<div>
					{foundDude && <FoundDude dude={this.state.dude} addPost={this.addPost} />}
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

	componentDidMount(){
		this.loadDude();
	},

	loadDude(){
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
	//also known as posts container

	getInitialState(){
		return {
			dude: this.props.dude,
			posts: [],
		}
	},

	componentDidMount(){
		this.loadPosts();
	},

	loadPosts(){
		return fetch('/api/posts/' + this.props.dude._id)
		.then((response) => response.json())
		.then((data) => {
			this.setState({ posts: data });
		})
		.catch((error) => {
			console.log("error fetching posts: ", error);
		});
	},

	addPost(post){
		return fetch('/api/posts', {
			method: 'POST',
			body: JSON.stringify(post),
			mode: 'cors',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then((response) => response.json())
		.then((data) => {
			let post = data;
			let postsModified = this.state.posts.concat(post);
			let dude = this.state.dude;
			this.setState({
				dude: dude,
				posts: postsModified
			});
		})
		.catch((error) => {
			console.log("error posting ", error);
		});
	},

	render(){
		return(
			<div>
				We found the dude: { this.props.dude.name }
				<h1>{this.props.dude.name}</h1>
				<h2>{this.props.dude.saying}</h2>
				<hr />
				<h2>Posts:</h2>
				<PostList dude={this.props.dude} posts={this.state.posts}/>
				<hr />
				<PostAdd dude={this.props.dude} posts={this.state.posts} addPost={this.addPost} />
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