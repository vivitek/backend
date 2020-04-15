const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer
const mongoose = require('mongoose');
const banModel = require("../../models/Ban")
const app = require("../../server")
const mongod = new MongoMemoryServer();
const request = require('supertest')

describe("Ban routes testing", () => {
	beforeAll(async () => {
		const uri = await mongod.getConnectionString();
		await mongoose.connect(`${uri}`, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
        });
	})
    it("get all bans", async () => {
        const res = await request(app).get("/ban")
        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBe(0)
    })
    it("create a ban", async () => {
        const res = await request(app).post("/ban").send(
            {
                address: "super config333",
                banned: true
            })
        expect(res.statusCode).toBe(201)
		expect(res.body._id).toBeDefined()
		expect(res.body.banned).toBe(true)
    })
    it("get a specific ban", async () => {
        const newConfig = await banModel({address: "test config"}).save()
        const res = await request(app).get(`/ban/${newConfig._id}`)
        expect(res.status).toBe(200)
        expect(res.body.address).toBe("test config")

    })
    it("delete a ban", async() => {
        const config = await banModel({address: "super banned address", banned: true}).save()
        const res = await request(app).delete(`/ban/${config._id}`)
        expect(res.body._id).toBeDefined()
        expect(res.body.address).toBe("super banned address")
    })
    it("update a ban", async () => {
        const newConfig = await banModel({address: "super config", banned: true}).save()
        const res = await request(app).patch(`/ban/${newConfig._id}`).send({
            banned:false
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.banned).toBe(false)
    })
})

