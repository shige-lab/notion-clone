const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		}
	}
);

module.exports = mongoose.model("Page", pageSchema);
