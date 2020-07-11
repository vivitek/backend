const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const permissionModel = require("../../models/Permission");
const app = require("../../server");
const mongod = new MongoMemoryServer();
const request = require("supertest");

describe("Permissions routes testing", () => {
	beforeAll(async () => {
		const uri = await mongod.getConnectionString();
		await mongoose.connect(`${uri}`, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
		});
	});
	it("get all permissions", async () => {
		const res = await request(app).get("/permission");
		expect(res.statusCode).toBe(200);
		expect(res.body.length).toBe(0);
	});
	it("get a specific permission", async () => {
		const perm = await permissionModel({ name: "test name", url: "/test" }).save();
		const res = await request(app).get(`/permission/${perm._id}`);
		expect(res.statusCode).toBe(200);
		expect(res.body.name).toBe("test name");
		expect(res.body.url).toBe("/test");
	});
	it("create a permission", async () => {
		const res = await request(app).post("/permission").send(
			{
				name: "su-permission",
				url: "/test",
				POST: false,
				GET: false,
				PATCH: false,
				DELETE: false
			}
		);
		expect(res.statusCode).toBe(201);
		expect(res.body._id).toBeDefined();
		expect(res.body.name).toBe("su-permission");
		expect(res.body.url).toBe("/test");
		expect(res.body.POST).toBe(false);
		expect(res.body.GET).toBe(false);
		expect(res.body.PATCH).toBe(false);
		expect(res.body.DELETE).toBe(false);
	});
	it("delete a permission", async() => {
		const perm = await permissionModel({ name: "to delete", url: "/test" }).save();
		const res = await request(app).delete(`/permission/${perm._id}`);
		expect(res.statusCode).toBe(200);
		expect(res.body.name).toBe("to delete");
		expect(res.body.url).toBe("/test");
	});
	it("update a permission", async() => {
		const perm = await permissionModel({ name: "super cool permission", url: "/test" }).save();
		const res = await request(app).patch(`/permission/${perm._id}`).send(
			{
				name: "this is not cool",
				url: "/none",
				POST: true,
				GET: true,
				PATCH: true,
				DELETE: true
			}
		);
		expect(res.statusCode).toBe(200);
		expect(res.body.name).toBe("this is not cool");
		expect(res.body.url).toBe("/none");
		expect(res.body.POST).toBe(true);
		expect(res.body.GET).toBe(true);
		expect(res.body.PATCH).toBe(true);
		expect(res.body.DELETE).toBe(true);
	});
});
