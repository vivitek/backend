const router = require("express").Router();
const banModel = require("../models/Ban");
const {checkTokenValidity} = require("../middleware/token");
const {checkPermission} = require("../middleware/permission");

router.use(checkTokenValidity);
router.use(checkPermission);

router.get("/", async(req, res) => {
	var list = await banModel.find();
	res.json(list);
});

router.get("/:id", async(req, res) => {
	let {id} = req.params;
	let ban;
	try {
		ban = await banModel.findById(id);
	} catch (error) {
		res.status(500).json({message:"could not find required data"});
		return;
	}
	res.json(ban);
});

router.delete("/:id", async(req, res) => {
	let {id} = req.params;
	let resu = await banModel.findByIdAndDelete(id);
	res.json(resu);
});

router.post("/", async(req, res) => {
	var newBan = await banModel.create(req.body);
	res.status(201).json(newBan);
});

router.patch("/:id", async(req, res) => {
	let ban = await banModel.findById(req.params.id);
	ban.banned = req.body.banned !== null ? req.body.banned : ban.banned;
	res.json(ban);
});

module.exports = router;
