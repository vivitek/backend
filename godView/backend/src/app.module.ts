import { Module } from '@nestjs/common';
import { appController } from './app.controller';
import { MongooseConnector } from './shared/MongooseConnector/mongooseConnector'
import { MongooseConnectorModule } from './shared/MongooseConnector/mongooseConnectorModule'

@Module({
  imports: [MongooseConnectorModule],
  controllers:[appController]
})
export class AppModule {
  public constructor(private mongoose: MongooseConnector) {}
}
