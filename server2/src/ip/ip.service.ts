import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Ip } from "./schemas/ip.schema"
import { Model } from "mongoose";
import { IpCreation, IpDTO, IpUpdate } from "./schemas/ip.dto";

@Injectable()
export class IpService {
    constructor(@InjectModel(Ip.name) private ipModel: Model<Ip>) {}

    async findAll() : Promise<IpDTO[]> {
        return (await this.ipModel.find().exec()).map((d: Ip) => toDTO(d))
    }

    async findById(id: string): Promise<IpDTO> {
        return toDTO(await this.ipModel.findById(id).exec())
    }

    async create(content: IpCreation): Promise<IpDTO> {
        return toDTO(await this.ipModel.create(content))
    }

    async deleteById(id: string): Promise<IpDTO> {
        return toDTO(await this.ipModel.findByIdAndDelete(id).exec())

    }

    async updateById(id: string, content: IpUpdate): Promise<IpDTO> {
        const ip = await this.ipModel.findById(id)
        if (content.v4ip)
            ip.v4ip = content.v4ip
        if (content.v6ip)
            ip.v6ip = content.v6ip
        return toDTO(await ip.save())
    }

    async deleteAll(): Promise<any> {
        if (!process.env.DEBUG) return null
        return this.ipModel.db.dropDatabase()
    }
}

function toDTO(data: Ip) {
    return !data ? null : {
        _id: data._id,
        v4ip: data.v4ip,
        v6ip: data.v6ip
    }
}

