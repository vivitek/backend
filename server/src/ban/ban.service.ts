import { Ban } from './schemas/ban.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BanCreation, BanUpdate } from './schemas/ban.inputs';

@Injectable()
export class BanService {
  constructor(@InjectModel(Ban.name) private banModel: Model<Ban>) {}

  async findAll(): Promise<Ban[]> {
    return await this.banModel.find().exec();
  }

  async findById(id: string): Promise<Ban> {
    return await this.banModel.findById(id).exec();
  }

  async findByRouter(id: string): Promise<Ban[]> {
    const bans = await this.banModel.find({ routerSet: id });
    return bans;
  }

  async create(content: BanCreation): Promise<Ban> {
    const ban = new this.banModel(content);
    return await ban.save();
  }

  async deleteById(id: string): Promise<Ban> {
    return await this.banModel.findByIdAndDelete(id).exec();
  }

  async deleteByRouter(routerId: string): Promise<boolean> {
    await this.banModel.deleteMany({ routerSet: routerId });
    return true
  }

  async updateById(id: string, content: BanUpdate): Promise<Ban> {
    const ban = await this.banModel.findByIdAndUpdate(id, content, {
      new: true,
    });
    return ban;
  }
}
