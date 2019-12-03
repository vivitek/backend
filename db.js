const mongoose = require("mongoose")

mongoose.connect("mongodb://matteo:matteo99@ds317808.mlab.com:17808/vivi", {useUnifiedTopology:true, useNewUrlParser:true})

var db = mongoose.connection

db.on("error", () => {
	console.error.bind(console, '[-] connection error: ')
})

db.once("open", () => {
	console.log("[+] Connection to database established")
})

module.exports = db