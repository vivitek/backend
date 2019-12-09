const mongoose = require("mongoose")

const banUserSchema = mongoose.Schema({
	address: {type: String, required:true, unique:true},
	banned: {type: Boolean}
})

const banUserModel = mongoose.model("ban", banUserSchema);

module.exports = banUserModel
