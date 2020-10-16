import { Controller, Get, Param, Post, Body, Delete, Patch } from "@nestjs/common";
import { ServiceCreation, ServiceDTO, ServiceUpdate } from "./schemas/service.dto";
import { ServiceService } from "./service.service"

@Controller('service')
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) {}

    @Get("/")
    async getAll(): Promise<Array<ServiceDTO>> {
        return this.serviceService.findAll()
    }

    @Get("/:id")
    async getById(@Param("id") id: string): Promise<ServiceDTO> {
        return this.serviceService.findById(id)
    }

    @Post("/")
    async create(@Body() content: ServiceCreation): Promise<ServiceDTO> {
        return this.serviceService.create(content)
    }

    @Delete("/:id")
    async deleteById(@Param("id") id: string): Promise<ServiceDTO> {
        return this.serviceService.deleteById(id)
    }

    @Patch("/:id")
    async updateById(@Param("id") id: string ,@Body() content: ServiceUpdate): Promise<ServiceDTO> {
        return this.serviceService.updateById(id, content)
    }
}