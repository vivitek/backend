import { Controller, Get, Param, Post, Body, Delete, Patch } from "@nestjs/common";
import { TagService } from "./tag.service"
import { TagCreation, TagDTO, TagUpdate } from "./schemas/tag.dto";

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get("/")
    async getAll(): Promise<Array<TagDTO>> {
        return this.tagService.findAll()
    }

    @Get("/:id")
    async getById(@Param("id") id: string): Promise<TagDTO> {
        return this.tagService.findById(id)
    }

    @Post("/")
    async create(@Body() content: TagCreation): Promise<TagDTO> {
        return this.tagService.create(content)
    }

    @Delete("/:id")
    async deleteById(@Param("id") id: string): Promise<TagDTO> {
        return this.tagService.deleteById(id)
    }

    @Patch("/:id")
    async updateById(@Param("id") id: string, @Body() content: TagUpdate): Promise<TagDTO> {
        return this.tagService.updateById(id, content)
    }
}