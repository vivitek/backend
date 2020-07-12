const router = require("express").Router();
const permissionModel = require("../models/Permission");
const {checkTokenValidity} = require("../middleware/token");
const {checkPermission} = require("../middleware/permission");

router.use(checkTokenValidity);
router.use(checkPermission);

router.post("/", async (req, res) => {
	const permission = await permissionModel.create(req.body);
	res.status(201).json(permission);
});

router.get("/", async (req, res) => {
	const permissions = await permissionModel.find();
	res.json(permissions);
});

router.get("/:id", async(req, res) => {
	const permission = await permissionModel.findById(req.params.id);
	res.json(permission);
});

router.patch("/:id", async(req, res) => {
	const { name, url, POST, GET, PATCH, DELETE } = req.body;
	let permission = await permissionModel.findById(req.params.id);
	if (name)
		permission.name = name;
	if (url)
		permission.url = url;
	if (POST)
		permission.POST = POST;
	if (GET)
		permission.GET = GET;
	if (PATCH)
		permission.PATCH = PATCH;
	if (DELETE)
		permission.DELETE = DELETE;
	permission = await permission.save();
	res.json(permission);
});

router.delete("/:id", async(req, res) => {
	let permission = await permissionModel.findByIdAndDelete(req.params.id);
	res.json(permission);
});

module.exports = router;