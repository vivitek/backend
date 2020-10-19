import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret
  })],
  exports: [AuthService],
  controllers:[AuthController]
})
export class AuthModule {}
