const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer
const mongoose = require('mongoose');
const UserModel = require('../models/User');
const routerModel = require("../models/Router")

const mongod = new MongoMemoryServer();
describe("User model test", () => {
	beforeAll(async () => {
		const uri = await mongod.getConnectionString();
		await mongoose.connect(`${uri}`, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
		});
	})
	it("create & save a user", async () => {
		const validUser = new UserModel({
			email: "mgassend2@gmail.com",
			password: "asdasdadda",
			firstName: "matteo",
			lastName: "gassend",
			telephoneNumber: "0781916684"
		})
		const savedUser = await validUser.save();
		expect(savedUser._id).toBeDefined();
		expect(savedUser.email).toBe("mgassend2@gmail.com");
	})
	it("create invalid user", async () => {
		const userWithoutRequiredField = new UserModel({ email: 'TekLoon' });
		let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error
		}
		expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
	})
	it("create user and add router to it", async () => {
		const validUser = new UserModel({
			email: "mgassend2@hotmail.com",
			password: "asdasdadda",
			firstName: "matteo",
			lastName: "gassend",
			telephoneNumber: "0781916684"
		})
		let savedUser = await validUser.save();
		expect(savedUser._id).toBeDefined();
		const validRouter = await new routerModel({name:"test", url:"https://"}).save()
		savedUser.routers.push(validRouter)
		savedUser = await savedUser.save()
		expect(savedUser.routers[0].name).toBe("test")
		savedUser = await UserModel.findOne({email:"mgassend2@hotmail.com"}).populate("routers")
		expect(savedUser.routers[0].name).toBe("test")
	})
	afterAll(async () => {
		await mongod.stop()
	})
})