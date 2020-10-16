import { Controller, Get, Param, Res } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { Response } from 'express';
import {Cursor} from 'rethinkdb'
import { ConnectionDto } from './schemas/connection.dto';

@Controller('connections')
export class ConnectionsController {
    constructor(
        private connectionService: ConnectionsService
    ) {}

    @Get(":routerId")
    async getConnections(@Param("routerId") routerId: string): Promise<Array<ConnectionDto>> {
        return await this.connectionService.getConnections(routerId)
    }
    @Get("listen/:routerId")
    async listen(@Param("routerId") routerId: string, @Res() res: Response): Promise<void> {

        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Connection", "keep-alive")
        res.flushHeaders();
        this.connectionService.listenToConnections(routerId, (err: Error, cursor: Cursor) => {
            if (err) return
            cursor.each((err: Error, row) => {
                if (err) return
                if (row.new_val && !row.old_val) res.write(`data: ${JSON.stringify(row.new_val)}\n\n`)
            })
        })
    }
}
