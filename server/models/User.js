const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	email: {type: String, required:true, unique:true},
	password: {type: String, required:true},
	firstName: {type: String, required:true},
	lastName: {type: String, required:true},
	telephoneNumber: {type:String, required:true},
	routers: [{type: mongoose.Schema.Types.ObjectId, ref:"router"}]
});

var userModel = mongoose.model("user", userSchema);


module.exports = userModel;