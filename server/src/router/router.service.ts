import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Router, RouterCreated } from './schemas/router.schema';
import { Model } from 'mongoose';
import {
  RouterCreationInput,
  RouterUpdateInput,
} from './schemas/router.inputs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RouterService {
  constructor(
    @InjectModel(Router.name) private routerModel: Model<Router>,
    private jwtService: JwtService
  ) { }

  async findAll(): Promise<Router[]> {
    return (await this.routerModel.find().exec());
  }

  async findById(id: string): Promise<Router> {
    return await this.routerModel.findById(id).exec();
  }

  async findByUrl(url: string): Promise<Router> {
    return await this.routerModel.findOne({ url }).exec();
  }

  async create(content: RouterCreationInput): Promise<RouterCreated> {
    try {
      const router = await new this.routerModel(content).save()
      const access_token = this.generateToken(router)
      return {
        access_token,
        router
      }
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async deleteById(id: string): Promise<Router> {
    return await this.routerModel.findByIdAndDelete(id);
  }

  async updateById(content: RouterUpdateInput): Promise<Router> {
    return this.routerModel
      .findByIdAndUpdate({ _id: content.id }, content, { new: true, })
      .exec();
  }

  generateToken(router: RouterCreationInput) {
    return this.jwtService.sign({
      ...router,
      type: "box"
    }, {
      secret: process.env.SECRET || "sting-sell-pioneer"
    })
  }
}
