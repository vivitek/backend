const fs = require("fs");
const express = require("express");
const app = express();

const stream = fs.createWriteStream("/restart.log");

app.post("/", (req, res) => {
	stream.write("restart\n", "UTF8");
	res.send("ok");
});

app.listen(4000, () => {
	console.log("[+] Listening on port 4000");
});
