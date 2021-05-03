import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Router } from './schemas/router.schema';
import { Model } from 'mongoose';
import {
  RouterCreationInput,
  RouterUpdateInput,
} from './schemas/router.inputs';
import { BalenaService } from '../balena/balena.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RouterService {
  constructor(
    @InjectModel(Router.name) private routerModel: Model<Router>,
    private balenaService: BalenaService,
    private jwtService: JwtService
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
    const uuid = /(https?:\/\/)?([^\./]+)/.exec(content.url)[2];
    const device = await this.balenaService.getRouterByUuid(uuid)
    if (!device)
      throw new NotFoundException()
    if (!device.env.map(e => e.name).includes("VINCIPIT_BEARER_TOKEN")) {
      const token = this.jwtService.sign({...device, type: "box"}, {
        secret: process.env.SECRET || "sting-sell-pioneer"
      })
      this.balenaService.setEnvVarByUuid(uuid, "VINCIPIT_BEARER_TOKEN", `Bearer ${token}`)
    }
    const router = new this.routerModel(content);
    return router.save();
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
