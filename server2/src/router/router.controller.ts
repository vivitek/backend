import { Controller, Get, Param, Post, Body, Delete, Patch } from "@nestjs/common";
import { RouterService, RouterCreation, RouterUpdate } from "./router.service"

@Controller('router')
export class RouterController {
    constructor(private readonly routerService: RouterService) {}

    @Get("/")
    async getAll() {
        return this.routerService.findAll()
    }

    @Get("/:id")
    async getById(@Param() id: string) {
        return this.routerService.findById(id)
    }

    @Post("/")
    async create(@Body() content: RouterCreation) {
        return this.routerService.create(content)
    }

    @Delete("/:id")
    async deleteById(@Param() id: string) {
        return this.routerService.deleteById(id)
    }

    @Patch("/:id")
    async updateById(@Param() id: string ,@Body() content: RouterUpdate) {
        return this.routerService.updateById(id, content)
    }
}