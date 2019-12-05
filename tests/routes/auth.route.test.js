const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer
const mongoose = require('mongoose');
const app = require("../../server")
const mongod = new MongoMemoryServer();
const request = require('supertest')

describe("Auth routes testing", () => {
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
	it("signs in a user", async () => {
		const res = await api.post("/auth/register").send({
			email:"mgassend1@gmail.com",
			password:"123456",
			firstName:"matteo",
			lastName:"ad",
			telephoneNumber:"09123"
		})
		expect(res.status).toBe(201)
		expect(res.body.token).toBeDefined()
	})
	it("user with same email", async () => {
		const res = await api.post("/auth/register").send({
			email:"mgassend1@gmail.com",
			password:"123456",
			firstName:"matteo",
			lastName:"ad",
			telephoneNumber:"09123"
		})
		expect(res.status).toBe(401)
	})
	it("user login", async () => {
		const res = await api.post("/auth/login").send({
			email:"mgassend1@gmail.com",
			password:"123456"
		})
		expect(res.status).toBe(200)
		expect(res.body.token).toBeDefined()
	})
	it("user wrong credentials login", async () => {
		const res = await api.post("/auth/login").send({
			email:"mgassend1@gmail.com",
			password:"123"
		})
		expect(res.status).toBe(401)
	})
	afterAll(async () => {
		await mongod.stop()
	})
})
