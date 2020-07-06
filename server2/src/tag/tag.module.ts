import { Tag, TagSchema } from './schemas/tag.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';

@Module({
  providers: [TagService ],
  imports: [MongooseModule.forFeature([{name: Tag.name, schema:TagSchema}])],
  controllers: [TagController]
})
export class TagModule {}
