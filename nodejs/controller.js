const Page = require("./model");

const getNotes = (req, res) => {
	// const page = Page.find({title: "test"});
	// const page = Page.findById("61bf6a1996fda3d6d03a27ba");
	// Page.find({note: {$title: ["test"]}}, function (err, docs) {
	console.log("1");
	console.log(req.body.userId);
	const page = Page.find(
		{ "note.userId": req.body.userId },
		function (err, docs) {
			// const page = Page.find({"note.userId": "8BtJsjpDbXfe5jvOhGzt9hcI2aq1"}, function (err, docs) {
			// const page = Page.findOne({"note.note.title": "saaa"}, function (err, docs) {
			if (err) {
				console.log(err);
			} else {
				// console.log(docs[0]);
				res.json(docs);
			}
		}
	);
	// res.json(page.note)
	// res.status(201).json({
	// res.status(201).json({
	//     // message: "Fetched page successfully.",
	//     note: page,
	//   });
	// console.log(page);
};

const saveNote = async (req, res) => {
	const page = new Page({
		note: req.body.note,
	});
	const savedPage = await page.save();
	console.log("new note created");
	res.json(savedPage);
	// console.log(req.body.content);
	// res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
	// console.log(req.data);
};

const updateNote = (req, res) => {
	// Page.find({_id: req.body.id}, function (err, docs) {
	// const note = Page.findById(req.body.id);
	// console.log(note.note.title);
	const note = Page.findById(req.body.id, function (err, docs) {
		if (err) {
			console.log(err);
		} else {
			console.log(docs._id);
			docs.note.title = req.body.title;
			docs.note.body = req.body.body;
			console.log(docs.note.title);
			docs.save();
			// res.json(docs);
		}
	});
	// note.save();
};

const deleteNote = async (req, res) => {
	// Page.find({_id: req.body.id}, function (err, docs) {
	// const note = Page.findById(req.body.id);
	// console.log(note.note.title);
	await Page.findByIdAndDelete(req.body.id, function (err) {
		if (err) {
			console.log(err);
		}
		console.log("delete");
	});
	// res.json("complete deleting");
	res.status(200).json({
		message: "Deleted page successfully.",
	});
};

exports.getNotes = getNotes;
exports.saveNote = saveNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
