import { BanService } from './ban.service';
import { Controller, Get, Param, Body, Post, Delete, Patch } from '@nestjs/common';
import { BanCreation, BanUpdate } from './schemas/ban.dto';

@Controller('ban')
export class BanController {
	constructor(private readonly banService: BanService) {}

	@Get()
	async getAll() {
		return this.banService.findAll()
	}

	@Get("/:id")
    async getById(@Param("id") id: string) {
        return this.banService.findById(id)
    }

    @Post("/")
    async create(@Body() content: BanCreation) {
        return this.banService.create(content)
    }

    @Delete("/:id")
    async deleteById(@Param("id") id: string) {
        return this.banService.deleteById(id)
    }

    @Patch("/:id")
    async updateById(@Param("id") id: string, @Body() content: BanUpdate) {
        return this.banService.updateById(id, content)
    }
}
