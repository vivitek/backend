import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Config, ConfigSchema } from './schemas/config.schema';
import { ConfigService } from './config.service';
import { ConfigResolver } from './config.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Config.name, schema: ConfigSchema }]),
  ],
  providers: [ConfigService, ConfigResolver],
})
export class ConfigModule {}
