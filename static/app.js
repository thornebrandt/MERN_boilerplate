let DudeTable = React.createClass({
	displayName: "DudeTable",

	render: function () {
		let dudeRows = this.props.dudes.map(dude => {
			return React.createElement(DudeRow, { key: dude.id, dude: dude });
		});

		return React.createElement(
			"table",
			null,
			dudeRows
		);
	}
});

let DudeRow = React.createClass({
	displayName: "DudeRow",

	render: function () {
		return React.createElement(
			"tr",
			null,
			React.createElement(
				"td",
				null,
				this.props.dude._id
			),
			React.createElement(
				"td",
				null,
				this.props.dude.name
			),
			React.createElement(
				"td",
				null,
				this.props.dude.saying
			)
		);
	}
});

let DudeAdd = React.createClass({
	displayName: "DudeAdd",

	render: function () {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"form",
				{ name: "addDudeForm" },
				React.createElement("input", { type: "text", name: "name", placeholder: "Name:" }),
				React.createElement("input", { type: "text", name: "saying", placeholder: "Saying:" }),
				React.createElement(
					"button",
					{ onClick: this.addDudeHandler },
					"Add Dude"
				)
			)
		);
	},

	addDudeHandler: function (e) {
		e.preventDefault();
		let form = document.forms.addDudeForm;
		this.props.addDude({
			name: form.name.value,
			saying: form.saying.value
		});
	}

});

let DudeList = React.createClass({
	displayName: "DudeList",

	getInitialState: function () {
		console.log("getting initial state");
		return {
			dudes: []
		};
	},

	render: function () {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h1",
				null,
				"Dudes"
			),
			React.createElement("hr", null),
			React.createElement(DudeTable, { dudes: this.state.dudes }),
			React.createElement("hr", null),
			React.createElement(DudeAdd, { addDude: this.addDude })
		);
	},

	componentDidMount: function () {
		$.ajax('/api/dudes').done(function (data) {
			this.setState({ dudes: data });
		}.bind(this));
	},

	addDude: function (dude) {
		$.ajax({
			type: 'POST',
			url: '/api/dudes',
			contentType: 'application/json',
			data: JSON.stringify(dude),
			success: function (data) {
				let dude = data;
				let dudesModified = this.state.dudes.concat(dude);
				this.setState({ dudes: dudesModified });
			}.bind(this),
			error: function (xhr, status, err) {
				console.log("Error adding dude:", err);
			}
		});
	}
});

ReactDOM.render(React.createElement(DudeList, null), document.getElementById('main'));