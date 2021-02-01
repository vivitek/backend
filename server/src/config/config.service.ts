import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Config } from './schemas/config.schema';
import { Model } from 'mongoose';
import {
  ConfigCreationInput,
  ConfigUpdateInput,
} from './schemas/config.inputs';

@Injectable()
export class ConfigService {
  constructor(@InjectModel(Config.name) private configModel: Model<Config>) {}

  async findAll(): Promise<Config[]> {
    return this.configModel.find().exec();
  }

  async findById(id: string): Promise<Config> {
    return this.configModel.findById(id).exec();
  }

  async create(content: ConfigCreationInput): Promise<Config> {
    const config = new this.configModel(content);
    return config.save();
  }

  async deleteById(id: string): Promise<Config> {
    return await this.configModel.findByIdAndDelete(id);
  }

  async updateById(content: ConfigUpdateInput): Promise<Config> {
    return this.configModel.findByIdAndUpdate(content._id, content, {
      new: true,
    });
  }
}
