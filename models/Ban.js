const mongoose = require("mongoose")

const banUserSchema = mongoose.Schema({
	address: {type: String, required:true, unique:true},
	banned: {type: Boolean}
})

const banUserModel = mongoose.model("config", banUserSchema);

module.exports = banUserModel
