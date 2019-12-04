var router = require("express").Router()
var userModel = require("../models/User")
var routerModel = require("../models/Router")

router.post("/", async (req, res) => {
    let theUser = await userModel.findById(/* user id */)
    let newRouter = new routerModel(req.body)

    theUser.routers.push(newRouter)
    theUser = await theUser.save()
    res.statusCode(201).json(newRouter)
})

router.get("/", async (req, res) => {
    let routerList = await routerModel.find();
    res.json(routerList);
})

router.get("/:id", async (req, res) => {
    let { id } = req.params
    let theRouter = await routerModel.findById(id)
    res.json(theRouter)
})

router.patch("/:id", async (req, res) => {
    let { id } = req.params
    let { name, url, config } = req.body
    let theRouter = await routerModel.findById(id)

    if (name)
        theRouter.name = name
    if (url)
        theRouter.url = url
    if (config)
        theRouter.config = config
    theRouter = await theRouter.save()
    res.json(theRouter)
})

module.exports = router;