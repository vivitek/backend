import { AuthService } from './auth.service';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("login")
	async login(@Body() login: LoginDto) {
		return this.authService.login(login.email, login.password)
	}

	@Post("register")
	async register(@Body() register: RegisterDto) {
		if (!register.email || !register.password || !register.username)
			throw new BadRequestException()
		return this.authService.register(register.email, register.password, register.username)
	}
}
