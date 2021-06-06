import { UserSchema, User } from './schemas/users.schema';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from '../router/router.module';

@Module({
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RouterModule
  ],
})
export class UsersModule {}
