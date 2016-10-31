let express = require('express');
let bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
let app = express();
let db;
let server;
app.use(express.static('static'));

app.get('/api/dudes', (req, res) =>{
	db.collection("dude").find().toArray((err, docs) => {
		console.log("finding timestamp", docs);
		docs = docs.map((doc) => {
			console.log(doc._id.getTimestamp());
			return doc;
		});
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


