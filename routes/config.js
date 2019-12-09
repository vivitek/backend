const router = require("express").Router()
const configModel = require("../models/Config")
const authentication = require("../middleware").checkAuthentication


router.get("/", authentication , async(req, res) => {
    let configs = await configModel.find()
    res.json(configs)
});

router.post("/", authentication , async(req, res) => {
    let {name, services} = req.body
    let newConfig = await configModel({name, services}).save()
    res.status(201).json(newConfig)
})

router.get("/:id", authentication , async(req, res) => {
    let {id} = req.params
    let config = await configModel.findById(id)
    res.json(config)
})

router.patch("/:id", authentication , async(req, res) => {
    let {id} = req.params
    let {name, services} = req.body
    let config = await configModel.findById(id)
    if (!config) {
        res.status(500).json({message:"could not find asked config"})
    }
    if (name)
        config.name = name
    if (services)
        config.services = services
    config = await config.save()
    res.json(config)
})

module.exports = router
