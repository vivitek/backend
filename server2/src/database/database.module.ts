import { databaseProviders } from './database.providers';
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService, ...databaseProviders],
  exports: [DatabaseService]
})
export class DatabaseModule {}
