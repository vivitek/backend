import { Module } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { ConnectionsController } from './connections.controller';
import { DatabaseService } from '../database/database.service';
import { DatabaseModule } from '../database/database.module';
// import { ConnectionResolver } from './connections.resolver';

@Module({
  providers: [ConnectionsService],
  imports: [DatabaseModule],
  controllers: [ConnectionsController]
})
export class ConnectionsModule {}
