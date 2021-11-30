import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Config, ConfigSchema } from './schemas/config.schema';
import { ConfigService } from './config.service';
import { ConfigResolver } from './config.resolver';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Config.name, schema: ConfigSchema }]),
    UsersModule,
  ],
  providers: [ConfigService, ConfigResolver],
})
export class ConfigModule {}
