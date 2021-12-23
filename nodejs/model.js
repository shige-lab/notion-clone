const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pageSchema = new Schema({
	note: {
		title: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			required: false,
		},
		body: [
			{
				type: String,
				required: false,
			},
		],
		userId: {
			type: String,
			required: false,
		},
	},
});

module.exports = mongoose.model("Page", pageSchema);
