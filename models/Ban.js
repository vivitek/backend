const mongoose = require("mongoose")

const banUserSchema = mongoose.Schema({
	address: {type: String, required:true, unique:true},
	banned: {type: Boolean},
	router: {type: mongoose.Schema.Types.ObjectId, ref:"router"}
})

const banUserModel = mongoose.model("ban", banUserSchema);

module.exports = banUserModel
