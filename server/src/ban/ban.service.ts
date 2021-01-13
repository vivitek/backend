import { Ban } from './schemas/ban.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BanUpdate } from './schemas/ban.dto';
import { BanCreation } from './schemas/ban.inputs';
import { RouterDTO } from 'src/router/schemas/router.dto';

@Injectable()
export class BanService {
  constructor(@InjectModel(Ban.name) private banModel: Model<Ban>) {}

  async findAll(): Promise<Ban[]> {
    return (await this.banModel.find().exec()).map(d => d);
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

  async updateById(id: string, content: BanUpdate): Promise<Ban> {
    const ban = await this.banModel.findByIdAndUpdate(id, content);
    return ban;
  }

  async deleteAll(): Promise<any> {
    if (!process.env.DEBUG) return null;
    return this.banModel.db.dropDatabase();
  }
}

function toDTO(data: Ban) {
  return !data
    ? null
    : {
        _id: data._id,
        address: data.address,
        banned: data.banned,
        routerSet: new RouterDTO(data.routerSet),
      };
}
