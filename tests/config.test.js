const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer
const mongoose = require('mongoose');
const configModel = require('../models/Config');

const mongod = new MongoMemoryServer();
describe("Config model test", () => {
	beforeAll(async () => {
		const uri = await mongod.getConnectionString();
		await mongoose.connect(`${uri}`, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
		});
	})
	it("create & save a config", async done => {
		const validConfig = new configModel({
			name: "test router",
		});
		const savedConfig = await validConfig.save();
		expect(savedConfig._id).toBeDefined();
		expect(savedConfig.name).toBe("test router");
		return done()
	})
	it("create invalid config", async done => {
		const routerWithoutRequiredFields = new configModel({});
		let err;
        try {
            const savedrouterWithoutRequiredFields = await routerWithoutRequiredFields.save();
            error = savedrouterWithoutRequiredFields;
        } catch (error) {
            err = error
		}
		expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
		return done()
	})
	afterAll(async () => {
		await mongod.stop()
	})
})