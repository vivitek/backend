const mongoose = require("mongoose");


const serviceSchema = mongoose.Schema({
	displayName: {type:String, required:true},
	name: {type:String, required:true},
	bandwidth: {type: Number, required:true},
	tags: [{type: mongoose.Schema.Types.ObjectId, ref: "tag", required: true}],
	ips: [{type: mongoose.Schema.Types.ObjectId, ref: "ip", required: true}],
});

const serviceModel = mongoose.model("service", serviceSchema);

module.exports = serviceModel;
