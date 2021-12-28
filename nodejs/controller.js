const Page = require("./model");
const mongoose = require("mongoose");

const getNotes = (req, res) => {
	console.log("get req for getNotes");
	Page.find({ "note.userId": req.body.userId }, function (err, docs) {
		if (err) {
			console.log(err);
		} else {
			res.json(docs);
		}
	});
};

const saveNote = async (req, res) => {
	console.log("get req for saveNotes");
	const page = new Page({
		note: req.body.note,
	});
	console.log(page);
	const savedPage = await page.save();
	console.log("new note created");
	res.json(savedPage);
};

const updateNote = async (req, res) => {
	const note = await Page.findById(req.body.id, function (err, docs) {
		if (err) {
			console.log(err);
		} else {
			console.log(docs._id);
			docs.note.title = req.body.title;
			docs.note.body = req.body.body;
			console.log(docs.note.title);
			docs.save();
		}
	});
	console.log(note);
	res.json(note);
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

// const duplicateNote = async (req, res) => {
// 	console.log(req.body.note);
// 	const duplicate = new Page({
// 		note: req.body.note,
// 	});

// 	console.log(duplicate);
// 	// const savedDuplicate = await duplicate.save();
// 	console.log("complete duplicate");
// 	// res.json(savedDuplicate);
// };

exports.getNotes = getNotes;
exports.saveNote = saveNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
// exports.duplicateNote = duplicateNote;
