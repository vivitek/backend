const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer
const mongoose = require('mongoose');
const serviceModel = require("../models/Service")

const mongod = new MongoMemoryServer();
describe("Service model test", () => {
	beforeAll(async () => {
		const uri = await mongod.getConnectionString();
		await mongoose.connect(`${uri}`, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
		});
	})
	it("create & save a service", async () => {
		const validConfig = new serviceModel({
			displayName:"test",
			name: "test.exe",
			bandwidth: 200.0
		});
		const savedConfig = await validConfig.save();
		expect(savedConfig._id).toBeDefined();
		expect(savedConfig.name).toBe("test.exe");
	})
	it("create invalid service", async () => {
		const routerWithoutRequiredFields = new serviceModel({ name: 'TekLoon' });
		let err;
        try {
            const savedrouterWithoutRequiredFields = await routerWithoutRequiredFields.save();
            error = savedrouterWithoutRequiredFields;
        } catch (error) {
            err = error
		}
		expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
	})
	afterAll(async () => {
		await mongod.stop()
	})
})