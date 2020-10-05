import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Config, ConfigSchema } from './schemas/config.schema';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';

@Module({
	imports:[MongooseModule.forFeature([{ name: Config.name, schema: ConfigSchema}])],
	controllers:[ConfigController],
	providers:[ConfigService]
})
export class ConfigModule {}
