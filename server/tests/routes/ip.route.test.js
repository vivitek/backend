
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const ipModel = require("../../models/Ip");
const app = require("../../server");
const mongod = new MongoMemoryServer();
const request = require("supertest");

describe("Ip routes testing", () => {
	beforeAll(async () => {
		const uri = await mongod.getConnectionString();
		await mongoose.connect(`${uri}`, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
		});
	});

	it("get all ips", async () => {
		const res = await request(app).get("/ip");
		expect(res.statusCode).toBe(200);
		expect(res.body.length).toBe(0);
	});

	it("create an ip", async () => {
		const res = await request(app).post("/ip").send({
			v4Ip: "0.0.0.0",
			v6Ip: "1.1.1.1"
		});
		expect(res.statusCode).toBe(201);
		expect(res.body._id).toBeDefined();
		expect(res.body.v4Ip).toBe("0.0.0.0");
		expect(res.body.v6Ip).toBe("1.1.1.1");
	});

	it("get a specific ip", async () => {
		const newIp = await ipModel({v4Ip: "2.2.2.2"}).save();
		const res = await request(app).get(`/ip/${newIp._id}`);
		expect(res.statusCode).toBe(200);
		expect(res.body.v4Ip).toBe("2.2.2.2");
	});

	it("can't get an ip which doesn't exists", async () => {
		const res = await request(app).get("/ip/toto42");
		expect(res.statusCode).toBe(500);
		expect(res.body.message).toBe("could not find required data");
	});

	it("delete an ip", async () => {
		const ip = await ipModel({v4Ip: "3.3.3.3"}).save();
		const res = await request(app).delete(`/ip/${ip._id}`);
		expect(res.body._id).toBeDefined();
		expect(res.body.v4Ip).toBe("3.3.3.3");
	});

	it("update an ip", async () => {
		const ip = await ipModel({v4Ip: "4.4.4.4"}).save();
		const res = await request(app).patch(`/ip/${ip._id}`).send({
			v4Ip: "5.5.5.5",
			v6Ip: "6.6.6.6"
		});
		expect(res.body._id).toBeDefined();
		expect(res.body.v4Ip).toBe("5.5.5.5");
		expect(res.body.v6Ip).toBe("6.6.6.6");
	});
});