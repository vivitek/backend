const app = require("./server")

app.listen(process.env.PORT || 5000, () => {
	console.log(`[+] Listening on port ${process.env.PORT || 5000}`)
})

