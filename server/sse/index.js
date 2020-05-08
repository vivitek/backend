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

router.post("/publish/:id", async(req, res) => {
	let {id} = req.params;
	await broker.sendMessage(`router${id}`, req.body.data);
	res.json({status:"success", data:{}});
});

router.post("/ack/:id", async(req, res) => {
	const {id} = req.params;
	const {data} = req.params;
	const channel = await broker.readQueue(`router${id}`);
	channel.consume(`router${id}`, (msg) => {
		if (msg.content.toString() == data.message) {
			channel.ack(msg);
		} else {
			channel.nack(msg);
		}
	});
	res.json({status:"success", data:{}});
});


module.exports = router;
