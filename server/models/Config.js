const mongoose = require("mongoose");

const configSchema = mongoose.Schema({
	name: {type: String, required: true},
	services: [{type: mongoose.Schema.Types.ObjectId, ref:"service"}]
});

const configModel = mongoose.model("config", configSchema);

module.exports = configModel;
