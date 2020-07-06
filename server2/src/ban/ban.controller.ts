import { BanService } from './ban.service';
import { Controller, Get } from '@nestjs/common';
import { Ban } from './schemas/ban.schema';

@Controller('ban')
export class BanController {
	constructor(private readonly banService: BanService) {}

	@Get()
	async getAll() : Promise<Ban[]> {
		return this.banService.findAll()
	}
}
