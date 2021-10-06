import { Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from '../users/schemas/users.schema';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './schemas/auth.inputs';
import { AuthDetails } from './schemas/auth.schema';
import { AuthGuard } from '../auth/auth.guard';

@Resolver()
export class AuthResolver {
  private logger: Logger;
  private pubSub: PubSub;
  constructor(private authService: AuthService) {
    this.logger = new Logger('AuthResolver');
    this.pubSub = new PubSub();
  }

  @Mutation(() => AuthDetails)
  async register(
    @Args('registerData') registerData: RegisterInput,
  ): Promise<AuthDetails> {
    return await this.authService.register(registerData);
  }

  @Mutation(() => AuthDetails)
  async login(@Args('loginData') loginData: LoginInput): Promise<AuthDetails> {
    return await this.authService.login(loginData);
  }

  @Mutation(() => AuthDetails)
  async loginGodView(
    @Args('loginData') loginData: LoginInput,
  ): Promise<AuthDetails> {
    return await this.authService.loginGodView(loginData);
  }

  @Query(() => Boolean)
  @UseGuards(new AuthGuard())
  async isAnAdmin(@Context('user') user: User): Promise<boolean> {
    return await this.authService.isAnAdmin(user);
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async toggleOTP(@Context('user') user: User): Promise<boolean> {
    return this.authService.toggleOTP(user._id.toString());
  }

  @Query(() => String)
  @UseGuards(new AuthGuard())
  async getOtpUrl(@Context('user') user: User): Promise<string> {
    return this.authService.getOtpData(user);
  }
  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async checkOtpCode(
    @Context('user') user: User,
    @Args('code') code: string,
  ): Promise<boolean> {
    return this.authService.checkOtpCode(user, code);
  }
}
