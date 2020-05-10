const mongoose = require("mongoose");

const templateSchema = mongoose.Schema({
	name: { type: String, required: true },
	author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
	hosts: [{
		banRef: { type: mongoose.Schema.Types.ObjectId, ref: "ban", required: true },
		banned: { type: Boolean, required: true }
	}],
	services: [{
		serviceRef: { type: mongoose.Schema.Types.ObjectId, ref: "service", required: true },
		banned: {type: Boolean, required: true }
	}]
});

const templateModel = mongoose.model("template", templateSchema);

module.exports = templateModel;
