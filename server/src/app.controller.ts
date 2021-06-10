import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello World';
  }
}
