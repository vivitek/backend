import { BanService } from './ban.service';
import { Controller, Get, Param, Body, Post, Delete, Patch } from '@nestjs/common';
import { BanCreation, BanDTO, BanUpdate } from './schemas/ban.dto';

@Controller('ban')
export class BanController {
	constructor(private readonly banService: BanService) {}

	@Get()
	async getAll(): Promise<Array<BanDTO>> {
		return this.banService.findAll()
	}

	@Get("/:id")
    async getById(@Param("id") id: string): Promise<BanDTO> {
        return this.banService.findById(id)
    }

    @Post("/")
    async create(@Body() content: BanCreation): Promise<BanDTO> {
        return this.banService.create(content)
    }

    @Delete("/:id")
    async deleteById(@Param("id") id: string): Promise<BanDTO> {
        return this.banService.deleteById(id)
    }

    @Patch("/:id")
    async updateById(@Param("id") id: string, @Body() content: BanUpdate): Promise<BanDTO> {
        return this.banService.updateById(id, content)
    }
}
