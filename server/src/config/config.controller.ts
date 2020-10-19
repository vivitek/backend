import { Controller, Get, Param, Post, Body, Delete, Patch } from "@nestjs/common";
import { ConfigService } from "./config.service"
import { ConfigCreation, ConfigDTO, ConfigUpdate } from "./schemas/config.dto";

@Controller('config')
export class ConfigController {
    constructor(private readonly configService: ConfigService) {}

    @Get("/")
    async getAll(): Promise<Array<ConfigDTO>> {
        return this.configService.findAll()
    }

    @Get("/:id")
    async getById(@Param("id") id: string): Promise<ConfigDTO> {
        return this.configService.findById(id)
    }

    @Post("/")
    async create(@Body() content: ConfigCreation): Promise<ConfigDTO> {
        return this.configService.create(content)
    }

    @Delete("/:id")
    async deleteById(@Param("id") id: string): Promise<ConfigDTO> {
        return this.configService.deleteById(id)
    }

    @Patch("/:id")
    async updateById(@Param("id") id: string ,@Body() content: ConfigUpdate): Promise<ConfigDTO> {
        return this.configService.updateById(id, content)
    }
}