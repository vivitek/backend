import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Service, ServiceSchema } from './schemas/service.schema';
import { ServiceService } from './service.service';
import { ServiceResolver } from './service.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
  ],
  providers: [ServiceService, ServiceResolver],
})
export class ServiceModule {}
