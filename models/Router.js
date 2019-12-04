const mongoose = require("mongoose")

const routerSchema = mongoose.Schema({
	name: {type: String, required:true},
	url: {type: String, required:true},
	config: {type: mongoose.Schema.Types.ObjectId, ref:"config"}
})

const routerModel = mongoose.model("router", routerSchema)

module.exports = routerModel