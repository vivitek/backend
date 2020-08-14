import { Controller, Get, Param, Post, Body, Delete, Patch } from "@nestjs/common";
import { ConfigService, ConfigCreation, ConfigUpdate } from "./config.service"

@Controller('config')
export class ConfigController {
    constructor(private readonly configService: ConfigService) {}

    @Get("/")
    async getAll() {
        return this.configService.findAll()
    }

    @Get("/:id")
    async getById(@Param() id: string) {
        return this.configService.findById(id)
    }

    @Post("/")
    async create(@Body() content: ConfigCreation) {
        return this.configService.create(content)
    }

    @Delete("/:id")
    async deleteById(@Param() id: string) {
        return this.configService.deleteById(id)
    }

    @Patch("/:id")
    async updateById(@Param() id: string ,@Body() content: ConfigUpdate) {
        return this.configService.updateById(id, content)
    }
}