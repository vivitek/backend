import { User } from './../users/schemas/user.schema';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from "bcrypt" 
@Injectable()
export class AuthService {
	constructor(
		private usersService:UsersService,
		private jwtService:JwtService,
		) {}

	async validateUser(email:string, password:string): Promise<any> {
		const user = await this.usersService.findOne(email)
		if (user && bcrypt.compareSync(password, user.password)) {
			const {password, ...result} = user;
			return result
		}
		return null
	}
	async login(email:string, password:string) {
		const payload = await this.validateUser(email, password)
		if (payload) {
			return {
				access_token: this.jwtService.sign(payload)
			}
		}
		return null
	}
	async register(email:string, password:string, username:string) {
		return this.usersService.createUser(email, password, username)
	}
}
