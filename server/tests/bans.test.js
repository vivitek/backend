const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const banModel = require("../models/Ban");
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
	});
	it("create a new ban", async () => {
		const newBan = await banModel.create({address:"4444", banned:false});
		expect(newBan._id).toBeDefined();
		expect(newBan.banned).toBe(false);
		expect(newBan.address).toBe("4444");
	});
	it("create an invalid ban", async() => {
		const banWithoutRequiredFields = new banModel({});
		let err;
		try {
			const savedbanWithoutRequiredFields = await banWithoutRequiredFields.save();
			error = savedbanWithoutRequiredFields;
		} catch (error) {
			err = error;
		}
		expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
	});
	afterAll(async () => {
		await mongod.close();
	});
});