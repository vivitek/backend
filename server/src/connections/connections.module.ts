import { Module } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { ConnectionsController } from './connections.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [ConnectionsService],
  imports: [DatabaseModule],
  controllers: [ConnectionsController]
})
export class ConnectionsModule {}
