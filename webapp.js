let express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

let app = express();
let db;
let server;
app.use(express.static('static'));
app.use(bodyParser.json());


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

/*Get all posts made by dude*/
app.get('/api/posts/:dude_id', (req, res) => {
	let dude_id = req.params.dude_id;
	db.collection("post").find({dude_id : req.params.dude_id}).toArray((err, docs) => {
		res.json(docs);
	});
});

/*Create post*/
app.post('/api/posts', (req, res) => {
	let newPost = req.body;
	db.collection("post").insertOne(newPost, (err, result) => {
		let newID = result.insertedId;
		db.collection("post").find({_id: newID}).next((err, doc) => {
			res.json(doc);
		});
	});
});

/*get one dude*/
app.get('/api/dudes/:name', (req, res) => {
	var regex = new RegExp(["^", req.params.name, "$"].join(""), "i");
	db.collection("dude").findOne({ name: regex }, (err, doc) => {
		res.json(doc);
	});
});

/*Modify one dude */
app.put('/api/dudes/:id', (req, res) =>{
	let dude = req.body;
	let oid = ObjectId(req.params.id);
	db.collection("dude").updateOne({_id: oid}, dude, (err, result) =>{
		db.collection("dude").find({_id: oid}).next((err, doc) => {
			res.send(doc);
		});
	});
});

/*Create a dude*/
app.post('/api/dudes', (req, res) => {
	let newDude = req.body;
	db.collection("dude").insertOne(newDude, (err, result) => {
		let newID = result.insertedId;
		db.collection("dude").find({_id: newID}).next((err, doc) => {
			res.json(doc);
		});
	});
});

/*PushState*/
app.get('*', (req, res) => {
	res.sendfile('./static/index.html');
});

MongoClient.connect('mongodb://localhost/dudes', (err, dbConnection) => {
	db = dbConnection;
	server = app.listen(3000, () =>{
		let port = server.address().port;
		console.log("Server started at port", port);
	});
});


