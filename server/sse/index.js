const router = require("express").Router()
const broker = require("../messages/index")


router.get("/:id", async(req, res) => {
	let {id} = req.params
	res.writeHead(200, {
		'Content-Type':"text/event-stream",
		'Cache-Control': "no-cache",
		'Connection': "keep-alive"
	})
	console.log(id)
	const channel = await broker.readQueue(`router${id}`)
	channel.consume(`router${id}`, (msg) => {
		res.write("data: " + msg.content.toString() + "\n\n")
	})
	res.on("close", async() => {
		await broker.removeChannel(`router${id}`)
		res.end()
	})
})


module.exports = router
