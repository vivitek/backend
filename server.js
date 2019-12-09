const app = require("express")()
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const socketEntry = require("./sockets/entrypoint")
// routers for services
const serviceRouter = require("./routes/service")
const authRouter = require("./routes/auth")
const routerRouter = require("./routes/router")
const configRouter = require("./routes/config")
const banRouter = require("./routes/bans")
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

if (!process.env.DEBUG)
	app.use(morgan("dev"))
app.use(cors())
app.use(bodyParser.json());
app.use("/service", serviceRouter)
app.use("/auth", authRouter)
app.use("/router", routerRouter)
app.use("/config", configRouter)
app.use("/ban", banRouter)

app.get("/", (req, res) => {
	res.send("🦔")
})

var http = require('http').createServer(app);
var io = require('socket.io')(http);


io.on("connection", (socket) => {
	socketEntry(socket, io)
})

module.exports = http
