import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Template } from "./schemas/template.schema"
import { Model } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { Ban } from "src/ban/schemas/ban.schema";
import { Service } from "src/service/schemas/service.schema";

@Injectable()
export class TemplateService {
    constructor(@InjectModel(Template.name) private templateModel: Model<Template>) {}

    async findAll() : Promise<Template[]> {
        return this.templateModel.find().exec()
    }

    async findById(id: string): Promise<Template> {
        return this.templateModel.findById(id).exec()
    }

    async create(content: TemplateCreation): Promise<Template> {
        return this.templateModel.create(content)
    }

    async deleteById(id: string): Promise<Template> {
        return (await this.templateModel.findByIdAndDelete(id))
    }

    async updateById(id: string, content: TemplateUpdate): Promise<Template> {
        const template = await this.templateModel.findById(id)
        if (content.name)
            template.name = content.name
        if (content.author)
            template.author = content.author
        if (content.hosts)
            template.hosts = content.hosts
        if (content.services)
            template.services = content.services
        return template.save()
    }
}

export interface TemplateCreation {
    name: string;
    author: User;
    hosts: Array<{
        banRef: Ban,
        banned: boolean
    }>
    services: Array<{
        serviceRef: Service,
        banned: boolean
    }>
}

export interface TemplateUpdate {
    name?: string;
    author?: User;
    hosts?: Array<{
        banRef: Ban,
        banned: boolean
    }>
    services?: Array<{
        serviceRef: Service,
        banned: boolean
    }>
}