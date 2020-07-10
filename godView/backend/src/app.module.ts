import { Module } from '@nestjs/common';
import { appController } from './app.controller';

@Module({
  imports: [],
  controllers:[appController]
})
export class AppModule {}