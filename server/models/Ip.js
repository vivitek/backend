const mongoose = require("mongoose");

const ipSchema = mongoose.Schema({
	v4Ip: {type: String, required: true},
	v6Ip: {type: String, required: false}
});

const ipModel = mongoose.model("ip", ipSchema);

module.exports = ipModel;