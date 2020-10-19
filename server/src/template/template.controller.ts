import { Controller, Get, Param, Post, Body, Delete, Patch } from "@nestjs/common";
import { TemplateCreation, TemplateDTO, TemplateUpdate } from "./schemas/template.dto";
import { TemplateService } from "./template.service"

@Controller('template')
export class TemplateController {
    constructor(private readonly templateService: TemplateService) {}

    @Get("/")
    async getAll(): Promise<Array<TemplateDTO>> {
        return this.templateService.findAll()
    }

    @Get("/:id")
    async getById(@Param("id") id: string): Promise<TemplateDTO> {
        return this.templateService.findById(id)
    }

    @Post("/")
    async create(@Body() content: TemplateCreation): Promise<TemplateDTO> {
        return this.templateService.create(content)
    }

    @Delete("/:id")
    async deleteById(@Param("id") id: string): Promise<TemplateDTO> {
        return this.templateService.deleteById(id)
    }

    @Patch("/:id")
    async updateById(@Param("id") id: string ,@Body() content: TemplateUpdate): Promise<TemplateDTO> {
        return this.templateService.updateById(id, content)
    }
}