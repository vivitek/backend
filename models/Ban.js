const mongoose = require("mongoose")

const banUserSchema = mongoose.Schema({
	address: {type: String, required:true},
	banned: {type: Boolean},
	router: {type: String}
})

const banUserModel = mongoose.model("ban", banUserSchema);

module.exports = banUserModel
