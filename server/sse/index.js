const router = require("express").Router();
const broker = require("../messages/index");


router.get("/:id", async(req, res) => {
	let {id} = req.params;
	res.writeHead(200, {
		"Content-Type":"text/event-stream",
		"Cache-Control": "no-cache",
		"Connection": "keep-alive"
	});
	const channel = await broker.readQueue(`router${id}`);
	channel.consume(`router${id}`, (msg) => {
		channel.nack(msg);
		res.write("data: " + JSON.stringify({content: msg.content.toString(), id:msg.fields.deliveryTag}) + "\n\n");
	});
	res.on("close", async() => {
		await channel.close();
		res.end();
	});
});


module.exports = router;
