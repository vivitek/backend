import { Controller, Get, Param, Post, Body, Delete, Patch } from "@nestjs/common";
import { RouterService } from "./router.service"
import { RouterCreation, RouterDTO, RouterUpdate } from "./schemas/router.dto";

@Controller('router')
export class RouterController {
    constructor(private readonly routerService: RouterService) {}

    @Get("/")
    async getAll(): Promise<Array<RouterDTO>> {
        return this.routerService.findAll()
    }

    @Get("/:id")
    async getById(@Param("id") id: string): Promise<RouterDTO> {
        return this.routerService.findById(id)
    }

    @Post("/")
    async create(@Body() content: RouterCreation): Promise<RouterDTO> {
        return this.routerService.create(content)
    }

    @Delete("/:id")
    async deleteById(@Param("id") id: string): Promise<RouterDTO> {
        return this.routerService.deleteById(id)
    }

    @Patch("/:id")
    async updateById(@Param("id") id: string ,@Body() content: RouterUpdate): Promise<RouterDTO> {
        return this.routerService.updateById(id, content)
    }
}