const router = require("express").Router();
const roleModel = require("../models/Role");
const {checkTokenValidity} = require("../middleware/token");
const {checkPermission} = require("../middleware/permission");

router.use(checkPermission);

router.post("/", checkTokenValidity, async(req, res) => {
	const role = await roleModel.create(req.body);
	res.status(201).json(role);
});

router.get("/", checkTokenValidity, async(req, res) => {
	const roles = await roleModel.find();
	res.json(roles);
});

router.get("/:id", checkTokenValidity, async(req, res) => {
	const role  = await roleModel.findById(req.params.id);
	res.json(role);
});

router.patch("/:id", checkTokenValidity, async(req, res) => {
	const { name, permissions } = req.body;
	let role = await roleModel.findById(req.params.id);
	if (name)
		role.name = name;
	if (permissions)
		role.permissions = permissions;
	role = await role.save();
	res.send(role);
});

router.delete("/:id", checkTokenValidity, async(req, res) => {
	let role = await roleModel.findByIdAndDelete(req.params.id);
	res.json(role);
});

module.exports = router;