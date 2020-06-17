
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const roleModel = require("../../models/Role");
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
	it("get all roles", async () => {
		const res = await request(app).get("/role");
		expect(res.statusCode).toBe(200);
		expect(res.body.length).toBe(0);
	});
	it("get a specific role", async () => {
		const permission = await permissionModel({name: "d-role", url: "/test"});
		const role = await roleModel({name: "admin", permissions: permission}).save();
		const res = await request(app).get(`/role/${role.id}`);
		expect(res.statusCode).toBe(200);
		expect(res.body._id).toBeDefined();
		expect(res.body.name).toBe("admin");
		expect(res.body.permissions.length).toBe(1);
		expect(res.body.permissions[0]).toBeDefined();
	});

	it("create a role", async () => {
		const permission = permissionModel({name: "test", url: "/test"});
		const res = await request(app).post("/role").send(
			{
				name: "super role",
				permissions: [ permission._id ]

			}
		);
		expect(res.statusCode).toBe(201);
		expect(res.body._id).toBeDefined();
		expect(res.body.name).toBe("super role");
		expect(res.body.permissions.length).toBe(1);
		expect(res.body.permissions[0]).toBeDefined();
	});
	it("delete a role", async () => {
		const permission = await permissionModel({name: "d-role", url: "/test"});
		const role = await roleModel({name: "admin", permissions: permission}).save();
		const res = await request(app).delete(`/role/${role._id}`);
		expect(res.statusCode).toBe(200);
		expect(res.body.name).toBe("admin");
		expect(res.body.permissions.length).toBe(1);
		expect(res.body.permissions[0]).toBeDefined();
	});
	it("update a role", async () => {
		const permission = await permissionModel({name: "this role is so cool", url: "/test"});
		const role = await roleModel({name: "admin", permissions: permission}).save();
		const res = await request(app).patch(`/role/${role._id}`).send(
			{
				name: "this role is not cool anymore",
				permissions: []
			}
		);
		expect(res.statusCode).toBe(200);
		expect(res.body.name).toBe("this role is not cool anymore");
		expect(res.body.permissions.length).toBe(0);
	});
});