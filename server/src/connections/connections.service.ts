import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ConnectionDto } from './schemas/connection.dto';
import * as rethink from "rethinkdb"

@Injectable()
export class ConnectionsService {
    constructor(
        private rethinkService: DatabaseService
    ) {
        try {
            this.rethinkService.createDb("vivi").then(() => {
                this.rethinkService.createTable("connections")
            })
        } catch (error) {
            console.error(error)
        }
    }
    async getConnections(routerId:string) {
        const connectionsCursor = await this.rethinkService.get("connections", {routerId, treated:false})
        const connectionArray = await connectionsCursor.toArray()
        if (connectionArray.length === 0) return []
        return connectionArray.map((conn) => new ConnectionDto(conn))
    }
    async listenToConnections(routerId:string, callback) {
        this.rethinkService.listen("connections", {routerId, treated:false}, callback)
    }
}
