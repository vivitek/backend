import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Router } from './schemas/router.schema';
import { Model } from 'mongoose';
import {
  RouterCreationInput,
  RouterUpdateInput,
} from './schemas/router.inputs';

@Injectable()
export class RouterService {
  constructor(
    @InjectModel(Router.name) private routerModel: Model<Router>,
  ) {}

  async findAll(): Promise<Router[]> {
    return (await this.routerModel.find().exec());
  }

  async findById(id: string): Promise<Router> {
    return await this.routerModel.findById(id).exec();
  }

  async findByUrl(url: string): Promise<Router> {
    return await this.routerModel.findOne({ url }).exec();
  }

  async create(content: RouterCreationInput): Promise<Router> {
    return await new this.routerModel(content).save();
  }

  async deleteById(id: string): Promise<Router> {
    return await this.routerModel.findByIdAndDelete(id);
  }

  async updateById(content: RouterUpdateInput): Promise<Router> {
    return this.routerModel
      .findByIdAndUpdate({ _id: content.id }, content, {new: true,})
      .exec();
  }
}
