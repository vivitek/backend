const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer
const mongoose = require('mongoose');
const UserModel = require('../models/User');

const mongod = new MongoMemoryServer();
describe("User model test", () => {
	beforeAll(async () => {
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
	it("create & save a user", async done => {
		const validUser = new UserModel({
			email: "mgassend@gmail.com",
			password: "asdasdadda",
			firstName: "matteo",
			lastName: "gassend",
			telephoneNumber: "0781916684"
		})
		const savedUser = await validUser.save();
		expect(savedUser._id).toBeDefined();
		expect(savedUser.email).toBe("mgassend@gmail.com");
		done()
	})
	it("create & not create an user", async done => {
		const userWithoutRequiredField = new UserModel({ email: 'TekLoon' });
		let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
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