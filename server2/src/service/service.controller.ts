import { Controller, Get, Param, Post, Body, Delete, Patch } from "@nestjs/common";
import { ServiceService, ServiceCreation, ServiceUpdate } from "./service.service"

@Controller('service')
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) {}

    @Get("/")
    async getAll() {
        return this.serviceService.findAll()
    }

    @Get("/:id")
    async getById(@Param() id: string) {
        return this.serviceService.findById(id)
    }

    @Post("/")
    async create(@Body() content: ServiceCreation) {
        return this.serviceService.create(content)
    }

    @Delete("/:id")
    async deleteById(@Param() id: string) {
        return this.serviceService.deleteById(id)
    }

    @Patch("/:id")
    async updateById(@Param() id: string ,@Body() content: ServiceUpdate) {
        return this.serviceService.updateById(id, content)
    }
}