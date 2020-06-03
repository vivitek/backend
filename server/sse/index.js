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
	broker.getConnections(id, (err, val) => {
		if (!err) {
			val.each((err, e) => {
				if (!err) {
					res.write(`data: ${JSON.stringify(e)}\n\n`);
				}
			});
		}
	});
	broker.readConnections(`${id}`, (err, val) => {
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
	const {connectionId, address, auth} = req.body;
	
	await broker.treatConnection(connectionId);
	const ban = await banModel.findOneAndUpdate({address}, {banned:auth});
	if (!ban) await ban.create({routerSet: id, address, banned:auth});
	res.json({status:"success", data:{}});
});


module.exports = router;