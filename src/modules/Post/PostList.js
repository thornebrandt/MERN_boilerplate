import 'whatwg-fetch';
const React = require('react');
const ReactDOM = require('react-dom');
const moment = require('moment');

let PostList = React.createClass({
	getInitialState(){
		return {
			posts: []
		}
	},

	componentDidUpdate: function(){
		console.log("updated", this.props);
	},

	componentDidMount(){
		this.loadPosts();
	},

	loadPosts: function(){
		return fetch('/api/posts/' + this.props.dude._id)
		.then((response) => response.json())
		.then((data) => {
			this.setState({ posts: data });
		})
		.catch((error) => {
			console.log("error fetching posts: ", error);
		});
	},

	render(){
		let postRows = this.state.posts.map((post) => {
			post.created_formatted = new moment(post.created).fromNow();
			return <Post key={post._id} post={post} />
		});
		return(
			<div>
				<h2>Post List Here</h2>
				<hr />
				{postRows}
			</div>
		);
	}
});


let Post = React.createClass({
	render(){
		let post = this.props.post;
		return(
			<div>
				<p>
					{post.content}
				</p>
				Posted {post.created_formatted}
			</div>
		);
	}
});

module.exports = PostList;