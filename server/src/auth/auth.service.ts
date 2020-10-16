import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { User } from 'src/users/schemas/users.schema';

@Injectable()
export class AuthService {
	constructor(
		private usersService:UsersService,
		private jwtService:JwtService,
		) {}

	async validateUser(email:string, password:string): Promise<any> {
		const user = await this.usersService.findOne(email)
		if (user && bcrypt.compareSync(password, user.password)) {
			//eslint-disable-next-line @typescript-eslint/no-unused-vars
			const {password, ...result} = user;
			return result
		}
		return null
	}
	async login(email:string, password:string): Promise<{access_token: string, user: User}> {
		const payload = await this.validateUser(email, password)
		if (payload) {
			return {
				access_token: this.jwtService.sign(payload, {secret: "sting-sell-pioneer"}),
				user: payload
			}
		}
		return null
	}
	async register(email:string, password:string, username:string): Promise<{access_token: string, user: User}> {
		const user = await this.usersService.createUser(email, password, username)
		return {
			access_token: this.jwtService.sign(user.toJSON(), {secret: "sting-sell-pioneer"}),
			user
		}
	}
}
