const mongoose = require("mongoose")

const routerSchema = mongoose.Schema({
	name: {type: String, required:true},
	url: {type: String, required:true},
	config: {type: String}
})

const routerModel = mongoose.model("router", routerSchema)

module.exports = routerModel