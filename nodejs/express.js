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

// app.get("/", (req, res) => {
// 	// res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
// 	console.log(req.data);
// 	console.log("1");
// });

app.post("/", (req, res) => {
	const page = new Page({
		content : req.data,
	  });
	page.save();
	console.log(res.data);
	// res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
	console.log(req.data);
	console.log("1");
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
