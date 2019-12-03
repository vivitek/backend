const mongoose = require("mongoose")

mongoose.connect("mongodb://matteo:matteo99@ds317808.mlab.com:17808/vivi", {useUnifiedTopology:true, useNewUrlParser:true})

var db = mongoose.connection

module.exports = db