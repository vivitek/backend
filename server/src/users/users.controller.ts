import { User } from './schemas/users.schema';
import { UsersService } from './users.service';
import { Controller, Get, Param, Delete, Patch, Body } from '@nestjs/common';
import { UserUpdateInput } from './schemas/users.input';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async list(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users.map(e => e);
  }

  @Get(':userID')
  async getUser(@Param('userID') userId: string): Promise<User> {
    const user = await this.userService.findById(userId);
    return user;
  }

  @Delete(':userID')
  async deleteUser(@Param('userID') userId: string): Promise<User> {
    const user = await this.userService.deleteById(userId);
    return user;
  }

  @Patch(':userID')
  async updateUser(@Body() user: UserUpdateInput): Promise<User> {
    const updated = await this.userService.updateById(user);
    return updated;
  }
}
