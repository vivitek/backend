import { jwtConstants } from './constants';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { AuthOtpService } from './auth.otp.service';

@Module({
  providers: [AuthService, AuthResolver, AuthOtpService],
  imports: [
    UsersModule,

    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  exports: [AuthService, AuthOtpService],
})
export class AuthModule {}
