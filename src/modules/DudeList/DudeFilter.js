let React = require('react');
let reactDOM = require('react-dom');

let DudeFilter = React.createClass({
	render(){
		return (
			<div>
				Age Cutoff:
				<select value={this.state.age} onChange={this.onChangeAge}>
					<option value="">Any</option>
					<option value="16">16</option>
					<option value="17">17</option>
					<option value="18">18</option>
					<option value="21">21</option>
					<option value="35">35</option>
				</select>
				Name: <input value={this.state.name} onChange={this.onChangeName} >
				</input>
				<br />
				<button onClick={this.submit}>Apply</button>
			</div>
		)
	},

	getInitialState: function(){
		return { age: "", name: ""}
	},

	onChangeAge: function(e){
		console.log("change age");
		this.setState({ age: e.target.value});
	},

	onChangeName: function(e){
		this.setState({ name: e.target.value});
	},

	submit: function(e){
		let newFilter = {};
		if(this.state.age){
			newFilter.age = this.state.age;
		}
		if(this.state.name){
			newFilter.name = this.state.name;
		}
		this.props.submitHandler(newFilter);
	}
});

module.exports = DudeFilter;