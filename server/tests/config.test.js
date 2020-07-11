const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const configModel = require("../models/Config");
const serviceModel = require("../models/Service");
const mongod = new MongoMemoryServer();
describe("Config model test", () => {
	beforeAll(async () => {
		const uri = await mongod.getConnectionString();
		await mongoose.connect(`${uri}`, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
		});
	});
	it("create & save a config", async () => {
		const validConfig = new configModel({
			name: "test router",
		});
		const savedConfig = await validConfig.save();
		expect(savedConfig._id).toBeDefined();
		expect(savedConfig.name).toBe("test router");
	});
	it("create invalid config", async () => {
		const routerWithoutRequiredFields = new configModel({});
		let err;
		try {
			const savedrouterWithoutRequiredFields = await routerWithoutRequiredFields.save();
			err = savedrouterWithoutRequiredFields;
		} catch (error) {
			err = error;
		}
		expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
	});
	it("create a config and add a service to it", async () => {
		const validConfig = new configModel({
			name: "test router",
		});
		let savedConfig = await validConfig.save();
		expect(savedConfig._id).toBeDefined();
		let savedService = await serviceModel({displayName:"test", name:"test.exe", bandwidth:200.0}).save();
		savedConfig.services.push(savedService);
		await savedConfig.save();
		savedConfig = await configModel.findById(savedConfig._id).populate("services");
		expect(savedConfig.services[0].name).toBe("test.exe");
	});
	afterAll(async () => {
		await mongod.stop();
	});
});