import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Service, ServiceSchema } from './schemas/service.schema';
import { ServiceService } from './service.service';
import { ServiceResolver } from './service.resolver';
import { TagModule } from '../tag/tag.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
    TagModule,
  ],
  providers: [ServiceService, ServiceResolver],
})
export class ServiceModule {}
