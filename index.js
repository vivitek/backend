const app = require("./server")
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const serviceRouter = require("./routes/service")
const serviceConfig = require("./routes/config")
// imports db client
const db = require("./db")

// if there is a connection error, do this
db.on("error", () => {
	console.error.bind(console, '[-] connection error: ')
})

// once a connection is established, do this
db.once("open", () => {
	console.log("[+] Connection to database established")
})

app.use(morgan("dev"))
app.use(cors())
app.use(bodyParser.json());
app.use("/service", serviceRouter)
app.use("/config", serviceConfig)

module.exports = app
