import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './schemas/tag.schema';
import { Model } from 'mongoose';
import { TagCreationInput, TagUpdateInput } from './schemas/tag.inputs';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  async findAll(): Promise<Tag[]> {
    return await this.tagModel.find().exec();
  }

  async findById(id: string): Promise<Tag> {
    return await this.tagModel.findById(id).exec();
  }

  async create(content: TagCreationInput): Promise<Tag> {
    const tag = new this.tagModel(content);
    return await tag.save();
  }

  async deleteById(id: string): Promise<Tag> {
    return await this.tagModel.findByIdAndDelete(id).exec();
  }

  async updateById(content: TagUpdateInput): Promise<Tag> {
    return this.tagModel.findByIdAndUpdate(content._id, content);
  }

  async deleteAll(): Promise<any> {
    if (!process.env.DEBUG) return null;
    return this.tagModel.db.dropDatabase();
  }
}
