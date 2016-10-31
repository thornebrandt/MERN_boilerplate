let express = require('express');
let bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
let app = express();
let db;
let server;
app.use(express.static('static'));

app.get('/api/dudes', function(req, res){
	db.collection("dude").find().toArray(function(err, docs){
		res.json(docs);
	});
});
app.use(bodyParser.json());
app.post('/api/dudes', function(req, res){
	let newDude = req.body;
	db.collection("dude").insertOne(newDude, function(err, result){
		let newID = result.insertedId;
		db.collection("dude").find({_id: newID}).next(function(err, doc){
			res.json(doc);
		});
	});
});
MongoClient.connect('mongodb://localhost/dudes', function(err, dbConnection){
	db = dbConnection;
	server = app.listen(3000, function(){
		let port = server.address().port;
		console.log("Server started at port", port);
	});
});


