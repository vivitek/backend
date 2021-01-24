import { AuthService } from './auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { User } from 'src/users/schemas/users.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() login: LoginDto,
  ): Promise<{ access_token: string; user: User }> {
    if (!login.email || !login.password)
      throw new BadRequestException('Bad request');
    const d = await this.authService.login(login.email, login.password);
    if (!d) throw new UnauthorizedException('Invalid credentials');
    return {
      access_token: d.access_token,
      user: d.user,
    };
  }

  @Post('register')
  async register(
    @Body() register: RegisterDto,
  ): Promise<{ access_token: string; user: User }> {
    if (!register.email || !register.username || !register.password)
      throw new BadRequestException('Bad request');
    const d = await this.authService.register(
      register.email,
      register.password,
      register.username,
    );
    return {
      access_token: d.access_token,
      user: d.user,
    };
  }
}
