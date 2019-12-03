const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer
const mongoose = require('mongoose');
const UserModel = require('../models/User');

describe("User model test", () => {
	beforeAll(async () => {
		const mongod = new MongoMemoryServer();

		const uri = await mongod.getConnectionString();
		const port = await mongod.getPort();
		const dbPath = await mongod.getDbPath();
		const dbName = await mongod.getDbName();
		await mongoose.connect(`${uri}`, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
		});
	})
	it("create & save a user", async () => {
		const validUser = new UserModel({
			email: "mgassend@gmail.com",
			password: "asdasdadda",
			firstName: "matteo",
			lastName: "gassend",
			telephoneNumber: "0781916684"
		})
		const savedUser = await validUser.save();
		expect(savedUser._id).toBeDefined();
		return expect(savedUser.email).toBe("mgassend@gmail.com");
	})
	it("create & not create an user", async () => {
		const userWithoutRequiredField = new UserModel({ email: 'TekLoon' });
		let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error
		}
		return expect(err).toBeInstanceOf(mongoose.Error.ValidationError)

	})
})