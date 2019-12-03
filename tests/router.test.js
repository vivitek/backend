const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer
const mongoose = require('mongoose');
const routerModel = require('../models/Router');

const mongod = new MongoMemoryServer();
describe("Router model test", () => {
	beforeAll(async () => {
		const uri = await mongod.getConnectionString();
		await mongoose.connect(`${uri}`, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
		});
	})
	it("create & save a user", async done => {
		const validRouter = new routerModel({
			name: "test router",
			url: "https://"
		});
		const savedRouter = await validRouter.save();
		expect(savedRouter._id).toBeDefined();
		expect(savedRouter.name).toBe("test router");
		done()
	})
	it("create & not create an user", async done => {
		const routerWithoutRequiredFields = new routerModel({ name: 'TekLoon' });
		let err;
        try {
            const savedrouterWithoutRequiredFields = await routerWithoutRequiredFields.save();
            error = savedrouterWithoutRequiredFields;
        } catch (error) {
            err = error
		}
		expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
		done()
	})
	afterAll(async () => {
		await mongod.stop()
	})
})