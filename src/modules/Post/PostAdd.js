let React = require('react');

let PostAdd= React.createClass({
	render(){
		return (
			<div>
				<h3>Add Post</h3>
				<form name="addPostForm">
					<textarea ref="content" name="content" placeholder="Post Content Here:" />
					<button onClick={this.addPostHandler}>Add Post</button>
				</form>
			</div>
		)
	},

	addPostHandler(e){
		e.preventDefault();
		let content = this.refs.content;
		this.props.addPost({
			content: content.value,
			dude_id: this.props.dude._id,
			created: new Date()
		});
		content.value = "";
	}
});

module.exports = PostAdd;