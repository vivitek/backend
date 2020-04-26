const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer
const mongoose = require('mongoose');
const mongod = new MongoMemoryServer();
const request = require("supertest");
const app = require("../server");

describe("Middleware test", () => {
	beforeAll(async () => {
		const uri = await mongod.getConnectionString();
		await mongoose.connect(`${uri}`, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
		});
	})
    it("non connected user", async () => {
        const res = await request(app).get("/config").send({isTestingAuth: true});
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("No authentication provided");
    });

    it("connected user", async () => {
        const user = await request(app).post("/auth/register").send({
            email: "john.doe@yopmail.com",
            password: "password",
            firstName: "John",
            lastName: "Doe",
            telephoneNumber: "0000000000"
        });
        const res = await request(app).get("/config")
            .send({isTestingAuth: true})
            .set("authorization", user.body.token);
        expect(res.status).toBe(200);
    })
})
