import { User } from './schemas/users.schema';
import { UsersService } from './users.service';
import { Controller, Get, Param, Delete, Patch, Body } from '@nestjs/common';
import { UserDto } from './schemas/users.dto'

export function fromUser(user: User) : UserDto {
	return !user ? null : new UserDto(user.email, user.username, user._id)
}

@Controller('users')
export class UsersController {
	constructor(
		private userService:UsersService
	) {}

	@Get()
	async list(): Promise<UserDto[]> {
		const users = await this.userService.getAll()
		return users.map((e) => fromUser(e))
	}

	@Get(':userID')
    async getUser(@Param('userID') userId: string) : Promise<UserDto> {
        const user = await this.userService.findById(userId);
        return fromUser(user);
	}

	@Delete(":userID")
	async deleteUser(@Param('userID') userId:string): Promise<UserDto> {
		const user = await this.userService.deleteUser(userId)
		return fromUser(user)
	}

	@Patch(":userID")
	async updateUser(@Param('userID') userId: string, @Body() user: UserDto ): Promise<UserDto & {_id: string}> {
		const updated = await this.userService.updateUser(userId, user)
		return { ...fromUser(updated), _id: updated._id }
	}
}
