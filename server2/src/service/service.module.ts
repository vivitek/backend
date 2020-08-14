import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Service, ServiceSchema } from './schemas/service.schema';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
	imports:[MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema}])],
	controllers:[ServiceController],
	providers:[ServiceService]
})
export class ServiceModule {}
