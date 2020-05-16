const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const templateModel = require("../../models/Template");
const userModel = require("../../models/User");
const serviceModel = require("../../models/Service");
const tagModel = require("../../models/Tag");
const banModel = require("../../models/Ban");
const app = require("../../server");
const mongod = new MongoMemoryServer();
const request = require("supertest");

describe("Template routes testing", () => {
	let templateId;
	beforeAll(async () => {
		const uri = await mongod.getConnectionString();
		await mongoose.connect(`${uri}`, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
		});
	});

	it("get all templates", async () => {
		const res = await request(app).get("/template");
		expect(res.statusCode).toBe(200);
		expect(res.body.length).toBe(0);
	});

	it("get a specific template", async () => {
		const createdTemplate = await new templateModel({
			name: "super template",
			author: new userModel({
				email: "supertest@yopmail.com",
				password: "s3cur3dP@ssw0rd",
				firstName: "John",
				lastName: "Doe",
				telephoneNumber: "0000000000"
			}),
			hosts: [{
				banRef: new banModel({
					address: "kk:kk:kk:kk:kk",
					banned: true
				}),
				banned: true
			}],
			services: [{
				serviceRef: new serviceModel({
					displayName: "super service",
					name: "service",
					bandwith: 20.0,
					tags: [new tagModel({name: "vivi"})]
				}),
				banned: true
			}]
		}).save();
		const res = await request(app).get(`/template/${createdTemplate._id}`);
		expect(res.statusCode).toBe(200);
		expect(res.body.name).toBe("super template");

	});

	it("get a ban which doesn't exists", async () => {
		const res = await request(app).get("/template/toto42");
		expect(res.statusCode).toBe(500);
		expect(res.body.message).toBe("could not find required data");
	});

	it("create a template", async () => {
		const author = await new userModel({
			email: "john.doe@yopmail.com",
			password: "s3p3rP@ssw0rd",
			firstName: "John",
			lastName: "Doe",
			telephoneNumber: "0000000000"
		});
		const res = await request(app).post("/template").send({
			name: "awesome template",
			author: author._id
		});
		expect(res.body._id).toBeDefined();
		expect(res.statusCode).toBe(201);
		expect(res.body.name).toBe("awesome template");
		templateId = res.body._id;
	});

	it("edit a template", async () => {
		const res = await request(app).patch(`/template/${templateId}`).send({
			name: "this template isn't cool"
		});
		expect(res.body._id).toBe(templateId);
		expect(res.statusCode).toBe(200);
		expect(res.body.name).toBe("this template isn't cool");
	});

	it("delete a template", async () => {
		const res = await request(app).delete(`/template/${templateId}`);
		expect(res.body._id).toBe(templateId);
		expect(res.statusCode).toBe(200);
	});
});

