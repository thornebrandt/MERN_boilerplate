let React = require('react');
let DudeAdd = require('./DudeAdd');


let DudeTable = React.createClass({
	render(){
		let dudeRows = this.props.dudes.map((dude) => {
			return <DudeRow key={dude._id} dude={dude} />
		});


		return (
			<table>
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
				<DudeTable dudes={this.state.dudes} />
				<hr />
				<DudeAdd addDude={this.addDude} />
			</div>
		)
	},

	componentDidMount(){
		$.ajax('/api/dudes').done(function(data){
			this.setState({dudes: data});
		}.bind(this));
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