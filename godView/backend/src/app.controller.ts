import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class appController {
    @Get('/')
    public jonhson(): string {
        return 'Jonhson c\'est moi';
    }
}