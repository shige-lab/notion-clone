const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const Page = require("./model");


app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, DELETE"
	);
	next();
});
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, '../frontend/public/index.html')));

// app.get('/', (req,res) => {
// 	res.sendFile(path.join(__dirname, '../frontend/index.html'));
//   });


app.get("/", (req, res) => {
	// const page = Page.find({title: "test"});
		// const page = Page.findById("61bf6a1996fda3d6d03a27ba");
		// Page.find({note: {$title: ["test"]}}, function (err, docs) {
		const page = Page.find({"note.userId": '8BtJsjpDbXfe5jvOhGzt9hcI2aq1'}, function (err, docs) {
		// const page = Page.findOne({title: "test"}, function (err, docs) {
		if (err)
			{
				console.log(err);
			}
		else {
			console.log(docs[0]);
			res.json(docs);
		}
	});
	// res.json(page.note)
	// res.status(201).json({
	// res.status(201).json({
    //     // message: "Fetched page successfully.",
    //     note: page,
    //   });
	// console.log(page);
});

app.post("/", (req, res) => {
	const page = new Page({
		note : req.body.note,
	  });
	  const savedPage = page.save();
	// console.log(req.body.content);
	// res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
	// console.log(req.data);
});

app.post("/update", (req, res) => {
	console.log('a');
	// Page.find({_id: req.body.id}, function (err, docs) {
	// const note = Page.findById(req.body.id);
	// console.log(note.note.title);
	const note = Page.findById(req.body.id, function (err, docs) {
		if (err)
		{
			console.log(err);
		}
	else {
		console.log(docs._id);
		docs.note.title = req.body.title;
		docs.note.body = req.body.body;
		console.log(docs.note.title);
		docs.save();
		// res.json(docs);
	}
	});
	// note.save();
	});

app.post("/delete", (req, res) => {
	console.log('a');
	// Page.find({_id: req.body.id}, function (err, docs) {
	// const note = Page.findById(req.body.id);
	// console.log(note.note.title);
	const note = Page.findByIdAndDelete(req.body.id, function (err) {
		if (err)
		{
			console.log(err);
		}
		console.log("delete");
	});
	});

const PORT = process.env.PORT || 3000;
// const PORT = 8080;

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.listen(PORT, () => {
	console.log(`**** SERVER STARTED AT PORT ${PORT} ****`);
});
