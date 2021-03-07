import { UsersService } from '../users/users.service';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/users.schema';
import { AuthDetails } from './schemas/auth.schema';
import { LoginInput, RegisterInput } from './schemas/auth.inputs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginInput): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }
  async login(data: LoginInput): Promise<AuthDetails> {
    const payload = await this.validateUser(data);
    if (payload) {
      return {
        access_token: this.jwtService.sign(payload.toJSON(), {
          secret: process.env.SECRET || 'sting-sell-pioneer',
        }),
        user: payload,
      };
    }
    throw new BadRequestException('Something went wrong');
  }
  async loginGodView(data: LoginInput): Promise<AuthDetails> {
    const payload = await this.login(data)
    if (!payload.user.email.endsWith('@vincipit.com'))
      throw new ForbiddenException()
    return payload
  }
  async isAnAdmin(user: User): Promise<boolean> {
    return user.email.endsWith("@vincipit.com")
  }
  async register({
    email,
    username,
    password,
  }: RegisterInput): Promise<AuthDetails> {
    try {
      const user = await this.usersService.createUser({
        email,
        password,
        username,
      });
      return {
        access_token: this.jwtService.sign(user.toJSON(), {
          secret: process.env.SECRET || 'sting-sell-pioneer',
        }),
        user,
      };
    } catch {
      throw new BadRequestException('User already exists');
    }
  }
}
