const router = require("express").Router();
const tagModel = require("../models/Tag");
const {checkPermission} = require("../middleware/permission");
const { checkTokenValidity } = require("../middleware/token");

router.use(checkTokenValidity);
router.use(checkPermission);

router.get("/", async (req, res) => {
	const tags = await tagModel.find();
	res.json(tags);
});

router.get("/:id", async (req, res) => {
	let tag = [];
	try {
		tag = await tagModel.findById(req.params.id);
	} catch(error) {
		res.status(500).json({message: "could not find required data"});
		return;
	}
	res.json(tag);
});

router.delete("/:id", async (req, res) => {
	const res_ = await tagModel.findByIdAndDelete(req.params.id);
	res.json(res_);
});

router.post("/", async (req, res) => {
	const newTag = await tagModel.create(req.body);
	res.status(201).json(newTag);
});

router.patch("/:id", async (req, res) => {
	let tag = await tagModel.findById(req.params.id);
	const {name} = req.body;

	if (name)
		tag.name = name;
	tag = await tag.save();
	res.json(tag);
});

module.exports = router;