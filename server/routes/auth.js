const router = require("express").Router()
const userModel = require("../models/User")
const bcrypt = require("bcrypt")
const jwt  = require('jsonwebtoken');


router.post("/register", async(req, res) => {
	let {email, password, firstName, lastName, telephoneNumber} = req.body
	let user = await userModel.findOne({email})
	if (user) {
		res.status(401).json({message:"invalid credentials"})
	} else {
		let cryptedPassword = bcrypt.hashSync(password, 12)
		user = await userModel.create({email, firstName, lastName, telephoneNumber, password:cryptedPassword})
		let token = jwt.sign(JSON.stringify(user), "lifebeforedeath")
		res.status(201).json({token})
	}
})

router.post("/login", async(req, res) => {
	let {email, password} = req.body
	let user = await userModel.findOne({email})
	if (user) {
		if (bcrypt.compareSync(password, user.password)) {
			let token = jwt.sign(JSON.stringify(user), "lifebeforedeath")
			res.json({token})
		} else {
			res.status(401).json({message:"invalid credentials"})
		}
	} else {
		res.status(401).json({message:"invalid credentials"})
	}
})

module.exports = router