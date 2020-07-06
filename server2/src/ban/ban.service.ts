import { Ban } from './schemas/ban.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'

@Injectable()
export class BanService {
	constructor(@InjectModel(Ban.name) private banModel: Model<Ban>) {}

	async findAll(): Promise<Ban[]> {
		return this.banModel.find().exec()
	}
}
