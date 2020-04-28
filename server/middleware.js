const jwt = require("jsonwebtoken");
const userModel = require("./models/User");

async function checkAuthentication(req, res, next) {
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
	if (req.headers["authorization"]) {
		let {authorization} = req.headers;
		let token = authorization.split(" ")[1];
		try {
			let user = jwt.decode(token, "lifebeforedeath");
			req.user = user;
			next();
		} catch (error) {
			res.status(401).json({message:"Invalid Token"});
		}
	} else {
		res.status(401).json({message:"No authentication provided"});
	}
}

module.exports = {checkAuthentication};