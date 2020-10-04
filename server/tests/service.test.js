const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const serviceModel = require("../models/Service");
const tagModel = require("../models/Tag");

const mongod = new MongoMemoryServer();
describe("Service model test", () => {
	beforeAll(async () => {
		const uri = await mongod.getConnectionString();
		await mongoose.connect(`${uri}`, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
		});
	});
	it("create & save a service", async () => {
		const validConfig = new serviceModel({
			displayName:"test",
			name: "test.exe",
			bandwidth: 200.0,
			tags: [new tagModel({ name: "vivi"})]
		});
		const savedConfig = await validConfig.save();
		expect(savedConfig._id).toBeDefined();
		expect(savedConfig.name).toBe("test.exe");
		expect(savedConfig.bandwidth).toBe(200.0);
		expect(savedConfig.tags[0].name).toBe("vivi");
	});
	it("create invalid service", async () => {
		const routerWithoutRequiredFields = new serviceModel({ name: "TekLoon" });
		let err;
		try {
			const savedrouterWithoutRequiredFields = await routerWithoutRequiredFields.save();
			error = savedrouterWithoutRequiredFields;
		} catch (error) {
			err = error;
		}
		expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
	});
	afterAll(async () => {
		await mongod.stop();
	});
});
