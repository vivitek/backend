const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer
const mongoose = require('mongoose');
const routerModel = require("../../models/Router")
const configModel = require("../../models/Config")
const serviceModel = require("../../models/Service")
const app = require("../../server")
const mongod = new MongoMemoryServer();
const request = require('supertest')

describe("Router routes testing", () => {
    let api
    beforeAll(async () => {
        api = request(app)
        const uri = await mongod.getConnectionString();
        await mongoose.connect(`${uri}`, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    })
    it("gets all routers", async done => {
        const res = await api.get("/router")
        expect(res.status).toBe(200)
        expect(res.body.length).toBe(0)
        return done()
    })
    // it("creates a new router", async done => {
    //     const theService = await new serviceModel({
    //         displayName: "testService",
    //         name: "testName",
    //         bandwidth: 200.0
    //     }).save()
    //     const theConfig = await new configModel({
    //         name: "testConfig",
    //         services: [theService]
    //     }).save()
    //     const res = await api.post("/router").send({
    //         name: "testRouter",
    //         url: "testURL",
    //         config: theConfig
    //     })
    //     expect(res.status).toBe(201)
    //     expect(res.body._id).toBeDefined()
    //     return done()
    // })
    it("udates a router", async done => {
        const newRouter = await new routerModel({
            name: "testRouter",
            url: "testURL"
        }).save()
        const res = await api.patch(`/router/${newRouter._id}`).send({
            name: "aNewName",
            url: "aNewURL"
        })
        expect(res.status).toBe(200)
        expect(res.body.name).toBe("aNewName")
        return done()
    })
})