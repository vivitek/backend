import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Router } from './schemas/router.schema';
import { Model } from 'mongoose';
import { RouterCreation, RouterDTO, RouterUpdate } from './schemas/router.dto';

@Injectable()
export class RouterService {
  constructor(@InjectModel(Router.name) private routerModel: Model<Router>) {}

  async findAll(): Promise<Router[]> {
    return (await this.routerModel.find().exec()).map(d => d);
  }

  async findById(id: string): Promise<Router> {
    return await this.routerModel.findById(id).exec();
  }

  async findByUrl(url: string): Promise<Router> {
    return await this.routerModel.findOne({ url }).exec();
  }

  async create(content: RouterCreation): Promise<Router> {
    const router = new this.routerModel(content);
    return router.save();
  }

  async deleteById(id: string): Promise<Router> {
    return await this.routerModel.findByIdAndDelete(id);
  }

  async updateById(id: string, content: RouterUpdate): Promise<Router> {
    const router = await this.routerModel.findById(id);
    if (content.name) router.name = content.name;
    if (content.url) router.url = content.url;
    return await router.save();
  }

  async deleteAll() /*: Promise<Array<Router>> */ {
    if (!process.env.DEBUG) return;
    return this.routerModel.db.dropDatabase();
  }
}

function toDTO(data: Router) {
  return !data
    ? null
    : {
        _id: data._id,
        name: data.name,
        url: data.url,
      };
}
