import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Router } from "./schemas/router.schema"
import { Model } from "mongoose";

@Injectable()
export class RouterService {
    constructor(@InjectModel(Router.name) private routerModel: Model<Router>) {}

    async findAll() : Promise<Router[]> {
        return this.routerModel.find().exec()
    }

    async findById(id: string): Promise<Router> {
        return this.routerModel.findById(id).exec()
    }

    async create(content: RouterCreation): Promise<Router> {
        return this.routerModel.create(content)
    }

    async deleteById(id: string): Promise<Router> {
        return (await this.routerModel.findByIdAndDelete(id))
    }

    async updateById(id: string, content: RouterUpdate): Promise<Router> {
        const router = await this.routerModel.findById(id)
        if (content.name)
            router.name = content.name
        if (content.url)
            router.url = content.url
        return router.save()
    }
}

export interface RouterCreation {
    name: string;
    url: string
}

export interface RouterUpdate {
    name?: string;
    url?: string;
}