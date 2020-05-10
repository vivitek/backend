const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
	name : {type: String, required: true}
});

const tagModel = mongoose.model("tag", tagSchema);

module.exports = tagModel;
