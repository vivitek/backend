const router = require("express").Router();
const ipModel = require("../models/Ip");

router.get("/", async (req, res) => {
	const ips = await ipModel.find();
	res.json(ips);
});

router.get("/:id", async (req, res) => {
	let ip = [];
	try {
		ip = await ipModel.findById(req.params.id);
	} catch(error) {
		res.status(500).json({message: "could not find required data"});
		return;
	}
	res.json(ip);
});

router.delete("/:id", async (req, res) => {
	const res_ = await ipModel.findByIdAndDelete(req.params.id);
	res.json(res_);
});

router.post("/", async (req, res) => {
	const newIp = await ipModel.create(req.body);
	res.status(201).json(newIp);
});

router.patch("/:id", async (req, res) => {
	let ip = await ipModel.findById(req.params.id);
	const { v4Ip, v6Ip } = req.body;

	if (v4Ip)
		ip.v4Ip = v4Ip;
	if (v6Ip)
		ip.v6Ip = v6Ip;
	ip = await ip.save();
	res.json(ip);
});

module.exports = router;