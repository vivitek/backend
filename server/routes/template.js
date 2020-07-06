const router = require("express").Router();
const templateModel = require("../models/Template");
const {checkTokenValidity} = require("../middleware/token");
const {checkPermission} = require("../middleware/permission");

router.use(checkPermission);

router.get("/", checkTokenValidity, async(req, res) => {
	var list = await templateModel.find();
	res.json(list);
});

router.get("/:id", checkTokenValidity,  async(req, res) => {
	let {id} = req.params;
	let template;
	try {
		template = await templateModel.findById(id);
	} catch (error) {
		res.status(500).json({message:"could not find required data"});
		return;
	}
	res.json(template);
});

router.delete("/:id", checkTokenValidity, async(req, res) => {
	let {id} = req.params;
	let _res = await templateModel.findByIdAndDelete(id);
	res.json(_res);
});

router.post("/", checkTokenValidity, async(req, res) => {
	var newtemplate = await templateModel.create(req.body);
	res.status(201).json(newtemplate);
});

router.patch("/:id", checkTokenValidity, async(req, res) => {
	let template = await templateModel.findById(req.params.id);
	const {name} = req.body;

	if (name)
		template.name = name;
	template = await template.save();
	res.json(template);
});

module.exports = router;
