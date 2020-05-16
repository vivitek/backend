const router = require("express").Router();
const templateModel = require("../models/Template");

router.get("/", async(req, res) => {
	var list = await templateModel.find();
	res.json(list);
});

router.get("/:id", async(req, res) => {
	let {id} = req.params;
	var list = [];
	try {
		list = await templateModel.find({"_id": id});
	} catch (error) {
		res.status(500).json({message:"could not find required data"});
		return;
	}
	res.json(list[0]);
});

router.delete("/:id", async(req, res) => {
	let {id} = req.params;
	let _res = await templateModel.findByIdAndDelete(id);
	res.json(_res);
});

router.post("/", async(req, res) => {
	var newtemplate = await templateModel.create(req.body);
	res.status(201).json(newtemplate);
});

router.patch("/:id", async(req, res) => {
	let template = await templateModel.findById(req.params.id);
	const {name} = req.body;

	if (name)
		template.name = name;
	template = await template.save();
	res.json(template);
});

module.exports = router;
