import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Ban, BanSchema } from './schemas/ban.schema';
import { BanService } from './ban.service';
import { BanResolver } from './ban.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ban.name, schema: BanSchema }])],
  providers: [BanService, BanResolver],
})
export class BanModule {}
