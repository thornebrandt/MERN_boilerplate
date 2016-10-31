let express = require('express');
let bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
let app = express();
let db;
let server;
app.use(express.static('static'));

app.get('/api/dudes', (req, res) =>{
	let filter = {};
	if(req.query.age){
		filter.age = { $gte: parseInt(req.query.age) };
	}
	if(req.query.name){
		let reg = /.*/;
		filter.name = new RegExp(reg.source + req.query.name + reg.source, 'i');
	}
	db.collection("dude").find(filter).toArray((err, docs) => {
		res.json(docs);
	});
});
app.use(bodyParser.json());
app.post('/api/dudes', (req, res) => {
	let newDude = req.body;
	db.collection("dude").insertOne(newDude, (err, result) => {
		let newID = result.insertedId;
		db.collection("dude").find({_id: newID}).next((err, doc) => {
			res.json(doc);
		});
	});
});
MongoClient.connect('mongodb://localhost/dudes', (err, dbConnection) => {
	db = dbConnection;
	server = app.listen(3000, () =>{
		let port = server.address().port;
		console.log("Server started at port", port);
	});
});


