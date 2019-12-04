const router = require("express").Router()
const serviceModel = require("../models/Service")

router.get("/", async(req, res) => {
	let services = await serviceModel.find()
	res.json(services)
})

router.post("/", async(req, res) => {
	let {name, displayName, bandwidth} = req.body
	let newService = await new serviceModel({name, displayName, bandwidth}).save()
	res.status(201).json(newService);
})

router.get("/:id", async(req, res) => {
	let {id} = req.params
	let service = await serviceModel.findById(id)
	res.json(service);
})

router.patch("/:id", async(req, res) => {
	let {id} = req.params
	let {name, displayName, bandwidth} = req.body
	let service = await serviceModel.findById(id)

	if (name)
		service.name = name
	if (displayName)
		service.displayName = displayName
	if (bandwidth)
		service.bandwidth = bandwidth
	service = await service.save()
	res.json(service)
})

module.exports = router