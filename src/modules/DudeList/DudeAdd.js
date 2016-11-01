let React = require('react');

let DudeAdd= React.createClass({
	render(){
		return (
			<div>
				<h3>Dude Add</h3>
				<form name="addDudeForm">
					<input type="text" name="name" placeholder="Name:" />
					<input type="text" name="saying" placeholder="Saying:" />
					<input type="text" name="age" placeholder="Age:" />
					<button onClick={this.addDudeHandler}>Add Dude</button>
				</form>
			</div>
		)
	},

	addDudeHandler(e){
		e.preventDefault();
		let form = document.forms.addDudeForm;
		this.props.addDude({
			name: form.name.value,
			saying: form.saying.value,
			age: form.age.value,
			created: new Date()
		});
	}
});

module.exports = DudeAdd;