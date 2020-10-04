var router = require("express").Router();
var userModel = require("../models/User");
var routerModel = require("../models/Router");
const {checkTokenValidity} = require("../middleware/token");
const {checkPermission} = require("../middleware/permission");

router.use(checkTokenValidity);
router.use(checkPermission);

router.post("/", async (req, res) => {
	let theUser = await userModel.findById(req.user._id);
	let newRouter = await routerModel.create(req.body);

	theUser.routers.push(newRouter);
	theUser = await theUser.save();
	res.status(201).json(newRouter);
});

router.get("/", async (req, res) => {
	let routerList = await userModel.findById(req.user._id).populate("routers").exec();
	res.json(routerList.routers);
});

router.get("/:id", async (req, res) => {
	let { id } = req.params;
	let theRouter = await routerModel.findById(id);
	res.json(theRouter);
});

router.patch("/:id", async (req, res) => {
	let { id } = req.params;
	let { name, url, config } = req.body;
	let theRouter = await routerModel.findById(id);

	if (name)
		theRouter.name = name;
	if (url)
		theRouter.url = url;
	if (config)
		theRouter.config = config;
	theRouter = await theRouter.save();
	res.json(theRouter);
});

module.exports = router;