import { Tag, TagSchema } from './schemas/tag.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';

@Module({
  providers: [TagService, TagResolver],
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  exports: [TagService],
})
export class TagModule {}
