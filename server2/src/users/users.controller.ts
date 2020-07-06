import { UsersService } from './users.service';
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
	constructor(
		private userService:UsersService
	) {}
	@Get()
	async list() {
		return this.userService.getAll()
	}
}
