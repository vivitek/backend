import { Module } from "@nestjs/common";
import { MongooseConnector } from "./mongooseConnector";

@Module({
  providers: [MongooseConnector],
  exports: [MongooseConnector]
})
export class MongooseConnectorModule {}
