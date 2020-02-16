const mongoose = require("mongoose")


const serviceSchema = mongoose.Schema({
	displayName: {type:String, required:true},
	name: {type:String, required:true},
	bandwidth: {type: Number, required:true}
})

const serviceModel = mongoose.model("service", serviceSchema)

module.exports = serviceModel
