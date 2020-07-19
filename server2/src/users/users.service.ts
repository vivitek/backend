import { UserDto } from './users.controller';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
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
		Object.keys(data).forEach((e) => {
			user[e] = data[e]
		})
		user = await user.save()
		return user
	}
}
