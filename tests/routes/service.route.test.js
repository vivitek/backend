const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer
const mongoose = require('mongoose');
const serviceModel = require("../../models/Service")
const app = require("../../server")
const mongod = new MongoMemoryServer();
const request = require('supertest')

describe("Service routes testing", () => {
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
	it("gets all services", async () => {
		const res = await api.get("/service")
		expect(res.status).toBe(200)
		expect(res.body.length).toBe(0)
	})
	it("creates a service", async () => {
		const res = await api.post("/service").send({
			name:"test",
			displayName:"testtest",
			bandwidth:200.0
		})
		expect(res.status).toBe(201)
		expect(res.body._id).toBeDefined()
	})
	it("updates a service", async () => {
		const newService = await new serviceModel({name:"testing", displayName:"name", bandwidth:200.0}).save()
		const res = await api.patch(`/service/${newService._id}`).send({
			name:"tester",
			displayName:"testername",
			bandwidth:300.0
		})
		expect(res.status).toBe(200)
		expect(res.body.name).toBe("tester")
	})
	afterAll(async () => {
		await mongod.stop()
	})
})