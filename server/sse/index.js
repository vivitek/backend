const router = require("express").Router();
const broker = require("../messages/index");
const banModel = require("../models/Ban");
const {checkAuthentication} = require("../middleware");
const r = require("rethinkdb");
router.get("/:id", checkAuthentication, async(req, res) => {
	let {id} = req.params;
	const connection = await broker.createConnection();
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
	r.db("vivi").table("connections").filter(r.row("treated").eq(false)).filter(r.row("routerId").eq(id)).changes().run(connection, (err, val) => {
		if (err) throw err;
		val.each((err, e) => {
			if (err) throw err;
			const val = e.new_val !== null ? e.new_val : (e.old_val !== null ? e.old_val : null);
			if (val !== null) res.write(`event:new\ndata: ${JSON.stringify(val)}\n\n`);
		});
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