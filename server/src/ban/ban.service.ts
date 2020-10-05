import { Ban } from './schemas/ban.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'
import { BanCreation, BanDTO, BanUpdate } from './schemas/ban.dto';

@Injectable()
export class BanService {
	constructor(@InjectModel(Ban.name) private banModel: Model<Ban>) {}

	async findAll(): Promise<BanDTO[]> {
		return (await this.banModel.find().exec()).map(d => toDTO(d))
	}
	    async findById(id: string): Promise<BanDTO> {
        return toDTO(await this.banModel.findById(id).exec())
    }

    async create(content: BanCreation): Promise<BanDTO> {
        return toDTO(await this.banModel.create(content))
    }

    async deleteById(id: string): Promise<BanDTO> {
        return toDTO(await this.banModel.findByIdAndDelete(id).exec())

    }

    async updateById(id: string, content: BanUpdate): Promise<BanDTO> {
        const ban = await this.banModel.findById(id)
        if (content.address)
            ban.address = content.address
        if (content.banned !== undefined)
			ban.banned = content.banned
		if (content.routerSet)
			ban.routerSet = content.routerSet
        return toDTO(await ban.save())
    }

    async deleteAll(): Promise<any> {
        if (!process.env.DEBUG) return null
        return this.banModel.db.dropDatabase()
    }
}

function toDTO(data: Ban) {
    return !data ? null : {
        _id: data._id,
        address: data.address,
		banned: data.banned,
		routerSet: data.routerSet
    }
}
