const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

async function checkTokenValidity(req, res, next) {
	if (process.env.DEBUG && !req.body.isTestingAuth) {
		let users = await userModel.find();
		if (users.length > 0) {
			req.user = users[0];
		} else {
			req.user = await userModel.create({
				email:"mgassend@gmail.com",
				password:"123456",
				firstName:"qqqq",
				lastName:"444",
				telephoneNumber:"44444444"
			});
		}
		return next();
	}
	let token;
	if (req.headers.authorization) {
		let {authorization} = req.headers;
		token = authorization.split(" ")[1];
	} else if (req.query.token) {
		token = req.query.token;
	} else {
		return res.status(401).json({message:"No authentication provided"});
	}
	try {
		let user = jwt.decode(token, "lifebeforedeath");
		req.user = user;
		return next();
	} catch (error) {
		return res.status(401).json({message:"Invalid Token"});
	}
}

module.exports = {checkTokenValidity};