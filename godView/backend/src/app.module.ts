import { Module } from '@nestjs/common';
import { appController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo:27017/vivi')],
  controllers:[appController]
})
export class AppModule {}