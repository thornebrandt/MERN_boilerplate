let DudeTable = React.createClass({
	render: function(){
		let dudeRows = this.props.dudes.map((dude) => {
			return <DudeRow key={dude.id} dude={dude} />
		});


		return (
			<table>
				{dudeRows}
			</table>
		)
	}
});

let DudeRow = React.createClass({
	render: function(){
		return (
			<tr>
				<td>{this.props.dude._id}</td>
				<td>{this.props.dude.name}</td>
				<td>{this.props.dude.saying}</td>
			</tr>
		)
	}
});


let DudeAdd= React.createClass({
	render: function(){
		return (
			<div>
				<form name="addDudeForm">
					<input type="text" name="name" placeholder="Name:" />
					<input type="text" name="saying" placeholder="Saying:" />
					<button onClick={this.addDudeHandler}>Add Dude</button>
				</form>
			</div>
		)
	},

	addDudeHandler: function(e){
		e.preventDefault();
		let form = document.forms.addDudeForm;
		this.props.addDude({
			name: form.name.value,
			saying: form.saying.value
		});
	}

});


let DudeList = React.createClass({
	getInitialState: function(){
		console.log("getting initial state");
		return {
			dudes: []
		}
	},


	render: function(){
		return (
			<div>
				<h1>Dudes</h1>
				<hr />
				<DudeTable dudes={this.state.dudes} />
				<hr />
				<DudeAdd addDude={this.addDude} />
			</div>
		)
	},

	componentDidMount: function(){
		$.ajax('/api/dudes').done(function(data){
			this.setState({dudes: data});
		}.bind(this));
	},

	addDude: function(dude){
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


ReactDOM.render(
	<DudeList />,
	document.getElementById('main')
);