import { AuthService } from './auth.service';
import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { UserDto } from '../users/schemas/users.dto';

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("login")
	@HttpCode(200)
	async login(@Body() login: LoginDto): Promise<{access_token: string, user: UserDto}> {
		if (!login.email || !login.password)
			throw new BadRequestException("Bad request")
		const d = await this.authService.login(login.email, login.password)
		if (!d)
			throw new UnauthorizedException("Invalid credentials")
		const user = new UserDto(d.user.email, d.user.username)
		return {access_token: d.access_token, user }
	}

	@Post("register")
	async register(@Body() register: RegisterDto): Promise<{access_token: string, user: UserDto}> {
		if (!register.email || !register.username || !register.password)
			throw new BadRequestException("Bad request")
		const d = await this.authService.register(register.email, register.password, register.username)
		if (!d)
			throw new BadRequestException("User already exists")
		return {access_token: d.access_token, user: new UserDto(d.user.email, d.user.username)}
	}
}
