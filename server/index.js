const http = require("./server");

http.listen(process.env.PORT || 5000, () => {
	console.log(`[+] Listening on port ${process.env.PORT || 5000}`);
});