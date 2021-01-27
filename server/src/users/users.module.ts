import { UserSchema, User } from './schemas/users.schema';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [UsersService, UserResolver],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UsersModule {}
