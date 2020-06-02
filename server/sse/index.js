const router = require("express").Router();
const broker = require("../messages/index");
const banModel = require("../models/Ban");
const {checkAuthentication} = require("../middleware");
router.get("/:id", checkAuthentication, async(req, res) => {
	const {datetime} = req.query;
	const sentValues = {};
	console.log(datetime);
	sentValues[datetime] = [];
	let {id} = req.params;
	res.writeHead(200, {
		"Content-Type":"text/event-stream",
		"Cache-Control": "no-cache",
		"Connection": "keep-alive"
	});
	await broker.readConnections(`${id}`, (err, val) => {
		if (err) res.end();
		val.each((err, e) => {
			if (err) res.end();
			res.write("data: " + JSON.stringify(e.new_val) + "\n\n");
		});
	});
	res.on("close", async() => {
		res.end();
	});
});

router.post("/publish/:id", checkAuthentication, async(req, res) => {
	let {id} = req.params;
	await broker.sendMessage(`router${id}`, req.body.data);
	res.json({status:"success", data:{}});
});

router.post("/ack/:id", checkAuthentication, async(req, res) => {
	const {id} = req.params;
	const {data} = req.body;
	const channel = await broker.readQueue(`router${id}`);
	channel.consume(`router${id}`, async(msg) => {
		if (msg.content.toString() == data.message) {
			channel.ack(msg);
			const ban = await banModel.find({address:data.message});
			if (ban) {
				ban.banned = data.auth;
				await ban.save();
			} else {
				await banModel.create({address:data.message, banned:data.auth});
			}
		} else {
			channel.nack(msg);
		}
	});
	res.json({status:"success", data:{}});
});


module.exports = router;
