const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const permissionModel = require("../../models/Permission");
const app = require("../../server");
const mongod = new MongoMemoryServer();
const request = require("supertest");

describe("Permissions routes testing", () => {
	beforeAll(async () => {
		const uri = await mongod.getConnectionString();
		await mongoose.connect(`${uri}`, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
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
				create: false,
				read: false,
				update: false,
				expunge: false
			}
		);
		expect(res.statusCode).toBe(201);
		expect(res.body._id).toBeDefined();
		expect(res.body.name).toBe("su-permission");
		expect(res.body.url).toBe("/test");
		expect(res.body.create).toBe(false);
		expect(res.body.read).toBe(false);
		expect(res.body.update).toBe(false);
		expect(res.body.expunge).toBe(false);
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
				create: true,
				read: true,
				update: true,
				expunge: true
			}
		);
		expect(res.statusCode).toBe(200);
		expect(res.body.name).toBe("this is not cool");
		expect(res.body.url).toBe("/none");
		expect(res.body.create).toBe(true);
		expect(res.body.read).toBe(true);
		expect(res.body.update).toBe(true);
		expect(res.body.expunge).toBe(true);
	});
});
