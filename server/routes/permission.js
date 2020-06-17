const router = require("express").Router();
const permissionModel = require("../models/Permission");
const authentication = require("../middleware").checkAuthentication;

router.post("/", authentication, async (req, res) => {
	const permission = await permissionModel.create(req.body);
	res.status(201).json(permission);
});

router.get("/", authentication, async (req, res) => {
	const permissions = await permissionModel.find();
	res.json(permissions);
});

router.get("/:id", authentication, async(req, res) => {
	const permission = await permissionModel.findById(req.params.id);
	res.json(permission);
});

router.patch("/:id", authentication, async(req, res) => {
	const { name, url, create, read, update, expunge } = req.body;
	let permission = await permissionModel.findById(req.params.id);
	if (name)
		permission.name = name;
	if (url)
		permission.url = url;
	if (create)
		permission.create = create;
	if (read)
		permission.read = read;
	if (update)
		permission.update = update;
	if (expunge)
		permission.expunge = expunge;
	permission = await permission.save();
	res.json(permission);
});

router.delete("/:id", async(req, res) => {
	let permission = await permissionModel.findByIdAndDelete(req.params.id);
	res.json(permission);
});

module.exports = router;