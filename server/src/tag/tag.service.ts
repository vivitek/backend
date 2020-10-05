import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Tag } from "./schemas/tag.schema"
import { Model } from "mongoose";
import { TagCreation, TagDTO, TagUpdate } from "./schemas/tag.dto";

@Injectable()
export class TagService {
    constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

    async findAll() : Promise<TagDTO[]> {
        return (await this.tagModel.find().exec()).map((d: Tag) => toDTO(d))
    }

    async findById(id: string): Promise<TagDTO> {
        return toDTO(await this.tagModel.findById(id).exec())
    }

    async create(content: TagCreation): Promise<TagDTO> {
        return toDTO(await this.tagModel.create(content))
    }

    async deleteById(id: string): Promise<TagDTO> {
        return toDTO(await this.tagModel.findByIdAndDelete(id).exec())

    }

    async updateById(id: string, content: TagUpdate): Promise<TagDTO> {
        const tag = await this.tagModel.findById(id)
        if (content.name)
            tag.name = content.name
        return toDTO(await tag.save())
    }

    async deleteAll(): Promise<any> {
        if (!process.env.DEBUG) return null
        return this.tagModel.db.dropDatabase()
    }
}

function toDTO(data: Tag) {
    return !data ? null : {
        _id: data._id,
        name: data.name
    }
}

