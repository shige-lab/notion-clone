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
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../frontend/src/index.tsx')));

// app.get('/', (req,res) => {
// 	res.sendFile(path.join(__dirname, '../frontend/index.html'));
//   });

const test = "test";

app.get("/", (req, res) => {
	console.log("2");
	console.log(req.userId)
	// const page = Page.find({title: "test"});
		// const page = Page.findById("61bf6a1996fda3d6d03a27ba");
		const page = Page.findOne({title: "test"}, function (err, docs) {
		if (err)
			{
				console.log(err);
			}
		else {
			console.log(docs);
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

const PORT = process.env.PORT || 3000;
// const PORT = 8080;

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.listen(PORT, () => {
	console.log(`**** SERVER STARTED AT PORT ${PORT} ****`);
});
