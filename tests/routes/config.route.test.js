const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer
const mongoose = require('mongoose');
const configModel = require("../../models/Config")
const app = require("../../server")
const mongod = new MongoMemoryServer();
const request = require('supertest')

describe("Service routes testing", () => {
	beforeAll(async () => {
		const uri = await mongod.getConnectionString();
		await mongoose.connect(`${uri}`, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
        });
	})
    it("get all configs", async () => {
        const res = await request(app).get("/config")
        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBe(0)
    })
    it("create a config", async () => {
        const res = await request(app).post("/config").send(
            {
                name: "super config",
                services: []
            })
        expect(res.statusCode).toBe(201)
        expect(res.body._id).toBeDefined()
    })
    it("update a config", async () => {
        const newConfig = await configModel({name: "super config", services: []}).save()
        const res = await request(app).patch(`/config/${newConfig._id}`).send({
            name: "new super config",
            services: []
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toBe("new super config")
    })
})

