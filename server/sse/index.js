const router = require("express").Router();
const broker = require("../messages/index");
const banModel = require("../models/Ban");
const checkTokenValidity = require("../middleware/token").checkTokenValidity;

router.get("/:id", checkTokenValidity, async(req, res) => {
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
					res.write(`event:untreated\ndata: ${JSON.stringify(e)}\n\n`);
				}
			});
		}
	});
	broker.readConnections(id, (err, val) => {
		if (err) throw err;
		val.each((err, e) => {
			if (err) throw err;
			const val = e.new_val !== null ? e.new_val : (e.old_val !== null ? e.old_val : null);
			if (val !== null) res.write(`event:new\ndata: ${JSON.stringify(val)}\n\n`);
		});
	});

});

router.post("/publish/:id", checkTokenValidity, async(req, res) => {
	let {id} = req.params;
	await broker.sendMessage(`router${id}`, req.body.data);
	res.json({status:"success", data:{}});
});

router.post("/ack/:id", checkTokenValidity, async(req, res) => {
	const {id} = req.params;
	const {connectionId, address, auth} = req.body;
	
	await broker.treatConnection(connectionId);
	const ban = await banModel.findOneAndUpdate({address}, {banned:auth});
	if (!ban) await banModel.create({routerSet: id, address, banned:auth});
	res.json({status:"success", data:{}});
});


module.exports = router;