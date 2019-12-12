const router = require("express").Router()
const banModel = require("../models/Ban")

router.get("/", async(req, res) => {
	var list = await banModel.find();
	res.json(list);
});

router.get("/:id", async(req, res) => {
	var list = await banModel.find({router:req.param("id", 1)})
	res.json(list)
})

router.post("/", async(req, res) => {
	var newBan = await banModel.create(req.body);
	res.status(201).json(newBan);
});

router.get("/:id", async(req, res) => {
	let ban = await banModel.findById(req.params.id);
	res.json(ban);
})

router.patch("/:id", async(req, res) => {
	let ban = await banModel.findById(req.params.id)
	ban.banned = req.body.banned !== null ? req.body.banned : ban.banned
	res.json(ban)
})

module.exports = router;