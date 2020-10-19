import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Router } from "./schemas/router.schema"
import { Model } from "mongoose";
import { RouterCreation, RouterDTO, RouterUpdate } from "./schemas/router.dto";

@Injectable()
export class RouterService {
    constructor(@InjectModel(Router.name) private routerModel: Model<Router>) {}

    async findAll() : Promise<RouterDTO[]> {
        return (await this.routerModel.find().exec()).map(d => toDTO(d))
    }

    async findById(id: string): Promise<RouterDTO> {
        return toDTO(await this.routerModel.findById(id).exec())
    }

    async create(content: RouterCreation): Promise<RouterDTO> {
        return toDTO(await this.routerModel.create(content))
    }

    async deleteById(id: string): Promise<RouterDTO> {
        return toDTO(await this.routerModel.findByIdAndDelete(id))
    }

    async updateById(id: string, content: RouterUpdate): Promise<RouterDTO> {
        const router = await this.routerModel.findById(id)
        if (content.name)
            router.name = content.name
        if (content.url)
            router.url = content.url
        return toDTO(await router.save())
    }

    async deleteAll(): Promise<Array<Router>> {
        if (!process.env.DEBUG) return
        return this.routerModel.db.dropDatabase()
    }
}

function toDTO(data: Router) {
    return !data ? null : {
        _id: data._id,
        name: data.name,
        url: data.url
    }
}