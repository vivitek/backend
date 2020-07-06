import { AuthService } from './auth.service';
import { Controller, Get, UseGuards,  Request, Post, Body } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
	@ApiProperty()
	email:string
	@ApiProperty()
	password:string
}

export class RegisterDto {
	@ApiProperty()
	email:string
	@ApiProperty()
	password:string
	@ApiProperty()
	username:string
}


@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("login")
	async login(@Body() login:LoginDto) {
		return this.authService.login(login.email, login.password) 
	}

	@Post("register")
	async register(@Body() register:RegisterDto) {
		return this.authService.register(register.email, register.password, register.username)
	}
}
