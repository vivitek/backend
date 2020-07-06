const router = require("express").Router();
const configModel = require("../models/Config");
const {checkTokenValidity} = require("../middleware/token");
const {checkPermission} = require("../middleware/permission");

router.use(checkPermission);


router.get("/", checkTokenValidity , async(req, res) => {
	let configs = await configModel.find();
	res.json(configs);
});

router.post("/", checkTokenValidity , async(req, res) => {
	let {name, services} = req.body;
	let newConfig = await configModel({name, services}).save();
	res.status(201).json(newConfig);
});

router.get("/:id", checkTokenValidity , async(req, res) => {
	let {id} = req.params;
	let config = await configModel.findById(id);
	res.json(config);
});

router.patch("/:id", checkTokenValidity , async(req, res) => {
	let {id} = req.params;
	let {name, services} = req.body;
	let config = await configModel.findById(id);

	if (name)
		config.name = name;
	if (services)
		config.services = services;
	config = await config.save();
	res.json(config);
});

module.exports = router;
