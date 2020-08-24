import { AuthService } from './auth/auth.service';
import { Controller, Get, UseGuards,  Request, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}


}
