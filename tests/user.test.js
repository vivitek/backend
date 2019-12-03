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
		return done()
	})
	it("create invalid user", async done => {
		const userWithoutRequiredField = new UserModel({ email: 'TekLoon' });
		let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error
		}
		expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
		return done()
	})
	it("create user and add router to it", async done => {
		const validUser = new UserModel({
			email: "mgassend@hotmail.com",
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
		savedUser = await UserModel.findOne({email:"mgassend@hotmail.com"}).populate("routers")
		expect(savedUser.routers[0].name).toBe("test")
		return done()
	})
	afterAll(async () => {
		await mongod.stop()
	})
})