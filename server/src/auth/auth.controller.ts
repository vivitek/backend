import { AuthService } from './auth.service';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { UserDto } from '../users/schemas/users.dto';

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("login")
	async login(@Body() login: LoginDto): Promise<{access_token: string, user: UserDto}> {
		const d = await this.authService.login(login.email, login.password)
		if (!d) return null
		return {access_token: d.access_token, user: new UserDto(d.user.email, d.user.username) }
	}

	@Post("register")
	async register(@Body() register: RegisterDto): Promise<{access_token: string, user: UserDto}> {
		if (!register.email || !register.password || !register.username)
			throw new BadRequestException()
		const d = await this.authService.register(register.email, register.password, register.username)
		if (!d) return null
		return {access_token: d.access_token, user: new UserDto(d.user.email, d.user.username)}
	}
}
