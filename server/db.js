const mongoose = require("mongoose")

mongoose.connect("mongodb://mongo:27017/vivi", {useUnifiedTopology:true, useNewUrlParser:true})

var db = mongoose.connection

module.exports = db