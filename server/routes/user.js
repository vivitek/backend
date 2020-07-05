const router = require("express").Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const { checkTokenValidity } = require("../middleware/token");

router.get("/", checkTokenValidity, async (req, res) => {
	const users = await userModel.find();
	res.json(users);
});

router.get("/:id", checkTokenValidity, async (req, res) => {
	const user = await userModel.findById(req.params.id);
	res.json(user);
});

router.patch("/:id", async (req, res) => {
	const { email, password, firstName, lastName, telephoneNumber, routers, role } = req.body;
	let user = await userModel.findById(req.params.id);

	if (email)
		user.email = email;
	if (password)
		user.password = bcrypt.hashSync(password, 12);
	if (firstName)
		user.firstName = firstName;
	if (lastName)
		user.lastName = lastName;
	if (telephoneNumber)
		user.telephoneNumber = telephoneNumber;
	if (routers)
		user.routers = routers;
	if (role)
		user.role = role;
	user = await user.save();
	res.json(user);
});

router.delete("/:id", checkTokenValidity, async (req, res) => {
	const role = await userModel.findByIdAndDelete(req.params.id);
	res.json(role);
});

module.exports = router;