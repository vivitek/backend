import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Config } from "./schemas/config.schema"
import { Model } from "mongoose";
import { ConfigCreation, ConfigUpdate } from "./schemas/config.dto";

@Injectable()
export class ConfigService {
    constructor(@InjectModel(Config.name) private configModel: Model<Config>) {}

    async findAll() : Promise<Config[]> {
        return this.configModel.find().exec()
    }

    async findById(id: string): Promise<Config> {
        return this.configModel.findById(id).exec()
    }

    async create(content: ConfigCreation): Promise<Config> {
        return this.configModel.create(content)
    }

    async deleteById(id: string): Promise<Config> {
        return (await this.configModel.findByIdAndDelete(id))
    }

    async updateById(id: string, content: ConfigUpdate): Promise<Config> {
        const config = await this.configModel.findById(id)
        if (content.name)
            config.name = content.name
        if (content.services)
            config.services = content.services
        return config.save()
    }

    async deleteAll() {
        if (!process.env.DEBUG) return
        return this.configModel.db.dropDatabase()
    }
}
