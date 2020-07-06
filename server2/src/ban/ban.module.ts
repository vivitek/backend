import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Ban, BanSchema } from './schemas/ban.schema';
import { BanController } from './ban.controller';
import { BanService } from './ban.service';

@Module({
	imports:[MongooseModule.forFeature([{ name: Ban.name, schema:BanSchema}])],
	controllers:[BanController],
	providers:[BanService]
})
export class BanModule {}
