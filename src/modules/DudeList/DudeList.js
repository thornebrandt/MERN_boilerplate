let React = require('react');
let DudeAdd = require('./DudeAdd');
let DudeFilter = require('./DudeFilter');
let moment = require('moment');


let DudeTable = React.createClass({
	render(){
		let dudeRows = this.props.dudes.map((dude) => {
			dude.created_formatted = new moment(dude.created).fromNow();
			return <DudeRow key={dude._id} dude={dude} />
		});


		return (
			<table>
				<thead>
					<tr>
						<th>ID</th><th>Name</th><th>Saying</th><th>Age</th><th>Created</th>
					</tr>
				</thead>
				<tbody>
					{dudeRows}
				</tbody>
			</table>
		)
	}
});

let DudeRow = React.createClass({
	render(){
		return (
			<tr>
				<td>{this.props.dude._id}</td>
				<td>{this.props.dude.name}</td>
				<td>{this.props.dude.saying}</td>
				<td>{this.props.dude.age}</td>
				<td>{this.props.dude.created_formatted}</td>
			</tr>
		)
	}
});


let DudeList = React.createClass({
	getInitialState(){
		return {
			dudes: []
		}
	},


	render(){
		return (
			<div>
				<h1>Dudes </h1>
				<hr />
				<DudeFilter submitHandler = { this.loadData } />
				<DudeTable dudes={this.state.dudes} />
				<hr />
				<DudeAdd addDude={this.addDude} />
			</div>
		)
	},

	componentDidMount(){
		// $.ajax('/api/dudes').done(function(data){
		// 	this.setState({dudes: data});
		// }.bind(this));
		this.loadData({});
	},

	loadData: function(filter){
		$.ajax('/api/dudes', { data: filter }).done((data) => {
			this.setState({ dudes:  data });
		});
	},

	addDude(dude){
		$.ajax({
			type: 'POST',
			url: '/api/dudes',
			contentType: 'application/json',
			data: JSON.stringify(dude),
			success: function(data){
				let dude = data;
				let dudesModified = this.state.dudes.concat(dude);
				this.setState({dudes: dudesModified});
			}.bind(this),
			error: function(xhr, status, err){
				console.log("Error adding dude:", err);
			}
		});
	}
});

module.exports = DudeList;