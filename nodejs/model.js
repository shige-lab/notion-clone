const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pageSchema = new Schema({
	note: {
		title: {
			type: String,
			required: false,
		},
		id: {
			type: String,
			required: false,
		},
		body: [
			{
				text: {
					type: String,
					required: false,
				},

				class: {
					type: String,
					required: false,
				},
			},
		],
		userId: {
			type: String,
			required: false,
		},
	},
});

module.exports = mongoose.model("Page", pageSchema);
