const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const serviceRouter = require("./routes/service")
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


// configure initial app
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(bodyParser.json());
app.use("/service", serviceRouter)

app.listen(process.env.PORT || 5000, () => {
	console.log(`[+] Listening on port ${process.env.PORT || 5000}`)
})

module.exports = app