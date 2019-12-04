const jwt = require("jsonwebtoken")

function checkAuthentication(req, res, next) {
	if (process.env.DEBUG)
		return next();
	if (req.headers["Authorization"]) {
		let {Authorization} = req.headers
		let token = Authorization.split(" ")[1]
		try {
			let user = jwt.sign(token, "lifebeforedeath")
			req.user = JSON.parse(user)
			next()
		} catch (error) {
			res.status(401).json({message:"Invalid Token"})
		}
	} else {
		res.status(401).json({message:"No authentication provided"})
	}
}

module.exports = {checkAuthentication}