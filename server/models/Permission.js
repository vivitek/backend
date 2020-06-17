const mongoose = require("mongoose");

const permissionTemplate = mongoose.Schema({
	name: {type: String, required: true},
	url: {type: String, required: true},
	create: {type: Boolean, default: false},
	read: {type: Boolean, default: false},
	update: {type: Boolean, default: false},
	expunge: {type: Boolean, default: false}
});

const permissionModel = mongoose.model("permission", permissionTemplate);

module.exports = permissionModel;