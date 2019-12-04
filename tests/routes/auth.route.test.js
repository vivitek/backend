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
	it("signs in a user", async done => {
		const res = await api.post("/auth/register").send({
			email:"mgassend@gmail.com",
			password:"123456",
			firstName:"matteo",
			lastName:"ad",
			telephoneNumber:"09123"
		})
		expect(res.status).toBe(201)
		expect(res.body.token).toBeDefined()
		return done()
	})
	it("user with same email", async done => {
		const res = await api.post("/auth/register").send({
			email:"mgassend@gmail.com",
			password:"123456",
			firstName:"matteo",
			lastName:"ad",
			telephoneNumber:"09123"
		})
		expect(res.status).toBe(401)
		return done()
	})
	it("user login", async done => {
		const res = await api.post("/auth/login").send({
			email:"mgassend@gmail.com",
			password:"123456"
		})
		expect(res.status).toBe(200)
		expect(res.body.token).toBeDefined()
		return done()
	})
	it("user wrong credentials login", async done => {
		const res = await api.post("/auth/login").send({
			email:"mgassend@gmail.com",
			password:"123"
		})
		expect(res.status).toBe(401)
		return done()
	})
})