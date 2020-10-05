import { Controller, Get, Param, Post, Body, Delete, Patch } from "@nestjs/common";
import { RouterService } from "./router.service"
import { RouterCreation, RouterUpdate } from "./schemas/router.dto";

@Controller('router')
export class RouterController {
    constructor(private readonly routerService: RouterService) {}

    @Get("/")
    async getAll() {
        return this.routerService.findAll()
    }

    @Get("/:id")
    async getById(@Param("id") id: string) {
        return this.routerService.findById(id)
    }

    @Post("/")
    async create(@Body() content: RouterCreation) {
        return this.routerService.create(content)
    }

    @Delete("/:id")
    async deleteById(@Param("id") id: string) {
        return this.routerService.deleteById(id)
    }

    @Patch("/:id")
    async updateById(@Param("id") id: string ,@Body() content: RouterUpdate) {
        return this.routerService.updateById(id, content)
    }
}