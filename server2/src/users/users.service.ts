import { UserDto } from './schemas/users.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import * as bcrypt from "bcrypt" 



@Injectable()
export class UsersService {
	@InjectModel(User.name) private userModel: Model<User>

	constructor() {
	}

	async findById(id:string): Promise<User> {
		return this.userModel.findById(id)
	}
	async findOne(email: string): Promise<User | undefined> {
		return this.userModel.findOne({email});
	}
	async getAll() : Promise<User[]> {
		return this.userModel.find()
	}
	async createUser(email:string, password:string, username:string): Promise<User | undefined> {
		return this.userModel.create({email:email, password:bcrypt.hashSync(password, 12), username:username})
	}
	async deleteUser(id: string): Promise<User> {
		return this.userModel.findByIdAndDelete(id)
	}
	async updateUser(id:string, data:UserDto): Promise<User> {
		let user = await this.userModel.findById(id)
		if (data.email)
			user.email = data.email
		if (data.username)
			user.username = data.username
		const d = await user.save()
		return d
	}

	async deleteAll() {
		if (!process.env.DEBUG) return
		return this.userModel.db.dropDatabase()
	}

}
