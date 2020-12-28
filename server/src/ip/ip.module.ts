import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Ip, IpSchema } from './schemas/ip.schema';
import { IpController } from './ip.controller';
import { IpService } from './ip.service';

@Module({
	imports:[MongooseModule.forFeature([{ name: Ip.name, schema: IpSchema}])],
	controllers:[IpController],
	providers:[IpService]
})
export class IpModule {}
