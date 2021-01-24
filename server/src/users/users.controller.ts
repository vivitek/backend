import { User } from './schemas/users.schema';
import { UsersService } from './users.service';
import { Controller, Get, Param, Delete, Patch, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async list(): Promise<User[]> {
    const users = await this.userService.getAll();
    return users.map(e => e);
  }

  @Get(':userID')
  async getUser(@Param('userID') userId: string): Promise<User> {
    const user = await this.userService.findById(userId);
    return user;
  }

  @Delete(':userID')
  async deleteUser(@Param('userID') userId: string): Promise<User> {
    const user = await this.userService.deleteUser(userId);
    return user;
  }

  @Patch(':userID')
  async updateUser(
    @Param('userID') userId: string,
    @Body() user: User,
  ): Promise<User> {
    const updated = await this.userService.updateUser(userId, user);
    return updated;
  }
}
