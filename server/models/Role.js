const mongoose = require("mongoose");

const roleTemplate = mongoose.Schema({
	name: {type: String, required: true},
	permissions: [{type: mongoose.Schema.Types.ObjectId, ref: "permission"}]
});

const roleModel = mongoose.model("role", roleTemplate);

module.exports = roleModel;