const mongoose = require("mongoose");

const permissionTemplate = mongoose.Schema({
	name: {type: String, required: true},
	url: {type: String, required: true},
	POST: {type: Boolean, default: false},
	GET: {type: Boolean, default: false},
	PATCH: {type: Boolean, default: false},
	DELETE: {type: Boolean, default: false}
});

const permissionModel = mongoose.model("permission", permissionTemplate);

module.exports = permissionModel;