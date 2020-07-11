const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
const roleModel = require("../models/Role");

async function checkPermission(req, res, next) {
	let role;
	if (process.env.DEBUG && !req.body.isTestingAuth)
		return next();
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedUser = jwt.decode(token, "lifebeforedeath");
		const user = await userModel.findById(decodedUser._id).populate("role");
		role = await roleModel.findById(user.role._id).populate("permissions");
	} catch (err) {
		return res.status(401).json({message: "Invalid a token"});
	}
	const banPermission = role.permissions.find(permission => permission.url === `/${req.baseUrl.split("/")[1]}`);
	if (!banPermission || !banPermission[req.method])
		return res.status(401).send({message: "Invalid z token"});
	next();
}

module.exports = { checkPermission };
