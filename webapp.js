let express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

let app = express();
let db;
let server;
app.use(express.static('static'));

/*get all dudes*/
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

/*get one dude*/
app.get('/api/dudes/:name', (req, res) => {
	var regex = new RegExp(["^", req.params.name, "$"].join(""), "i");
	db.collection("dude").findOne({ name: regex }, (err, dude) => {
		res.json(dude);
	});
});

app.get('*', (req, res) => {
	res.sendfile('./static/index.html');
});

app.use(bodyParser.json());


/*Modify one dude */
app.put('/api/dudes/:id', (req, res) =>{
	let dude = req.body;
	console.log("Modifying dude:", req.params.id, dude);
	let oid = ObjectId(req.params.id);
	db.collection("dude").updateOne({_id: oid}, dude, (err, result) =>{
		db.collection("dude").find({_id: oid}).next((err, doc) => {
			res.send(doc);
		});
	});
});


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


