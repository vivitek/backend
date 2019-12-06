const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer
const mongoose = require('mongoose');
const serviceModel = require("../../models/Service")
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
	it("gets all services", async done => {
		const res = await request(app).get("/service")
		expect(res.status).toBe(200)
		expect(res.body.length).toBe(0)
		return done()
	})
	it("creates a service", async done => {
		const res = await request(app).post("/service").send({
			name:"test",
			displayName:"testtest",
			bandwidth:200.0
		})
		expect(res.status).toBe(201)
		expect(res.body._id).toBeDefined()
		return done()
	})
    it("get a specific service", async done => {
		const newService = await new serviceModel({name:"testing name", displayName:"name", bandwidth:200.0}).save()
        const res = await request(app).get(`/service/${newService._id}`)
        expect(res.status).toBe(200)
        expect(res.body.name).toBe("testing name")
        return done()
    })
	it("updates a service", async done => {
		const newService = await new serviceModel({name:"testing", displayName:"name", bandwidth:200.0}).save()
		const res = await request(app).patch(`/service/${newService._id}`).send({
			name:"tester",
			displayName:"testername",
			bandwidth:300.0
		})
		expect(res.status).toBe(200)
		expect(res.body.name).toBe("tester")
		return done()
	})
})
