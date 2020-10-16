import { Controller, Get, Param, Post, Body, Delete, Patch } from "@nestjs/common";
import { IpService } from "./ip.service"
import { IpCreation, IpDTO, IpUpdate } from "./schemas/ip.dto";

@Controller('ip')
export class IpController {
    constructor(private readonly ipService: IpService) {}

    @Get("/")
    async getAll(): Promise<Array<IpDTO>> {
        return this.ipService.findAll()
    }

    @Get("/:id")
    async getById(@Param("id") id: string): Promise<IpDTO> {
        return this.ipService.findById(id)
    }

    @Post("/")
    async create(@Body() content: IpCreation): Promise<IpDTO> {
        return this.ipService.create(content)
    }

    @Delete("/:id")
    async deleteById(@Param("id") id: string): Promise<IpDTO> {
        return this.ipService.deleteById(id)
    }

    @Patch("/:id")
    async updateById(@Param("id") id: string, @Body() content: IpUpdate): Promise<IpDTO> {
        return this.ipService.updateById(id, content)
    }
}