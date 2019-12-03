const mongoose = require("mongoose")

const configSchema = mongoose.Schema({
	name: {type: String, required: true}
})

const configModel = mongoose.model("config", configSchema);

module.exports = configModel