const fs = require("fs");
const express = require("express");
const app = express();


app.post("/", (req, res) => {
	const stream = fs.createWriteStream("/restart.log");
	stream.write("restart", "UTF8");
	stream.end();
	res.send("ok");
});

app.listen(4000, () => {
	console.log("[+] Listening on port 4000");
});