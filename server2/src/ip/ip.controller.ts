import { Controller, Get, Param, Post, Body, Delete, Patch } from "@nestjs/common";
import { IpService, IpCreation, IpUpdate } from "./ip.service"

@Controller('router')
export class IpController {
    constructor(private readonly routerService: IpService) {}

    @Get("/")
    async getAll() {
        return this.routerService.findAll()
    }

    @Get("/:id")
    async getById(@Param() id: string) {
        return this.routerService.findById(id)
    }

    @Post("/")
    async create(@Body() content: IpCreation) {
        return this.routerService.create(content)
    }

    @Delete("/:id")
    async deleteById(@Param() id: string) {
        return this.routerService.deleteById(id)
    }

    @Patch("/:id")
    async updateById(@Param() id: string ,@Body() content: IpUpdate) {
        return this.routerService.updateById(id, content)
    }
}