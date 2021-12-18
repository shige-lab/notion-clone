const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");


app.use ((req, res, next) => {
	res.setHeader("/", process.env.REACT_URL);
	next();
});

// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../frontend/src/index.tsx')));

// app.get('/', (req,res) => {
// 	res.sendFile(path.join(__dirname, '../frontend/index.html'));
//   });
  

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`**** SERVER STARTED AT PORT ${PORT} ****`);
});
