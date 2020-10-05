import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Template } from "./schemas/template.schema"
import { Model } from "mongoose";
import { TemplateCreation, TemplateDTO, TemplateUpdate } from "./schemas/template.dto";

@Injectable()
export class TemplateService {
    constructor(@InjectModel(Template.name) private templateModel: Model<Template>) {}

    async findAll() : Promise<TemplateDTO[]> {
        return (await this.templateModel.find().exec()).map(d => toDTO(d))
    }

    async findById(id: string): Promise<TemplateDTO> {
        return toDTO(await this.templateModel.findById(id).exec())
    }

    async create(content: TemplateCreation): Promise<TemplateDTO> {
        return toDTO(await this.templateModel.create(content))
    }

    async deleteById(id: string): Promise<TemplateDTO> {
        return toDTO(await this.templateModel.findByIdAndDelete(id))
    }

    async updateById(id: string, content: TemplateUpdate): Promise<TemplateDTO> {
        const template = await this.templateModel.findById(id)
        if (content.name)
            template.name = content.name
        if (content.author)
            template.author = content.author
        if (content.hosts)
            template.hosts = content.hosts
        if (content.services)
            template.services = content.services
        return toDTO(await template.save())
    }

    async deleteAll() {
        if (!process.env.DEBUG) return
        return this.templateModel.db.dropDatabase()
    }
}

function toDTO(data: Template) {
    return !data ? null : {
        _id: data._id,
        name: data.name,
        author: data.author,
        hosts: data.hosts,
        services: data.services
    }
}