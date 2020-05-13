const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const tagModel = require("../../models/Tag");
const app = require("../../server");
const mongod = new MongoMemoryServer();
const request = require("supertest");

describe("Tag routes testing", () => {
	beforeAll(async () => {
		const uri = await mongod.getConnectionString();
		await mongoose.connect(`${uri}`, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
		});
	});

	it("get all tags", async () => {
		const res = await request(app).get("/tag");
		expect(res.statusCode).toBe(200);
		expect(res.body.length).toBe(0);
	});

	it("create a tag", async () => {
		const res = await request(app).post("/tag").send({
			name: "super tag"
		});
		expect(res.statusCode).toBe(201);
		expect(res.body._id).toBeDefined();
		expect(res.body.name).toBe("super tag");
	});

	it("get a specific tag", async () => {
		const newTag = await tagModel({name: "new tag"}).save();
		const res = await request(app).get(`/tag/${newTag._id}`);
		expect(res.statusCode).toBe(200);
		expect(res.body.name).toBe("new tag");
	});

	it("can't get a tag which doesn't exists", async () => {
		const res = await request(app).get("/tag/toto42");
		expect(res.statusCode).toBe(500);
		expect(res.body.message).toBe("could not find required data");
	});

	it("delete a tag", async () => {
		const tag = await tagModel({name: "rip tag"}).save();
		const res = await request(app).delete(`/tag/${tag._id}`);
		expect(res.body._id).toBeDefined();
		expect(res.body.name).toBe("rip tag");
	});

	it("update a tag", async () => {
		const tag = await tagModel({name: "awesome tag"}).save();
		const res = await request(app).patch(`/tag/${tag._id}`).send({
			name: "not cool tag"
		});
		expect(res.body._id).toBeDefined();
		expect(res.body.name).toBe("not cool tag");
	});
});