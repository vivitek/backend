const app = require("./server")
var http = require('http').createServer(app);
var io = require('socket.io')(http);


http.listen(process.env.PORT || 5000, () => {
	console.log(`[+] Listening on port ${process.env.PORT || 5000}`)
})

io.on("connection", (socket) => {
	console.log(`[+] new socket connection`)
	socket.emit("message", "hello world")
})