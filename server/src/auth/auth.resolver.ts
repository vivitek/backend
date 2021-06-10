import { Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from '../users/schemas/users.schema';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './schemas/auth.inputs';
import { AuthDetails } from './schemas/auth.schema';
import { AuthGuard } from "../auth/auth.guard"

@Resolver()
export class AuthResolver {
  private logger: Logger;
  private pubSub: PubSub;
  constructor(private authService: AuthService) {
    this.logger = new Logger('AuthResolver');
    this.pubSub = new PubSub();
  }

  @Mutation(() => AuthDetails)
  async register(@Args('registerData') registerData: RegisterInput): Promise<AuthDetails> {
    return await this.authService.register(registerData);
  }

  @Mutation(() => AuthDetails)
  async login(@Args('loginData') loginData: LoginInput): Promise<AuthDetails> {
    return await this.authService.login(loginData);
  }

  @Mutation(() => AuthDetails)
  async loginGodView(@Args('loginData') loginData: LoginInput): Promise<AuthDetails> {
    return await this.authService.loginGodView(loginData)
  }

  @Query(() => Boolean)
  @UseGuards(new AuthGuard())
  async isAnAdmin(@Context('user') user: User): Promise<boolean> {
    return await this.authService.isAnAdmin(user)
  }

}
