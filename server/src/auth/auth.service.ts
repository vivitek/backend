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

  async validateUser({ email, username, password }: LoginInput): Promise<User | null> {
    const credential = email || username;
    if (!credential)
      throw new BadRequestException();
    const user = await this.usersService.findOne({ $or: [
      {email: credential},
      {username: credential}
    ]});
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }
  async login(data: LoginInput): Promise<AuthDetails> {
    const payload = await this.validateUser(data);
    if (payload) {
      return {
        access_token: this.generateToken(payload),
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
        access_token: this.generateToken(user),
        user,
      };
    } catch {
      throw new BadRequestException('User already exists');
    }
  }

  private generateToken(user: User): string {
    return this.jwtService.sign(
      {
        ...user.toJSON(),
        type: "user",
      }, {
        secret: process.env.SECRET || 'sting-sell-pioneer',
      }
    )
  }
}
