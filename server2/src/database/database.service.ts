import { Inject, Injectable } from '@nestjs/common';
import * as rethink from "rethinkdb"

@Injectable()
export class DatabaseService {

	private connection: rethink.Connection
	constructor(
		@Inject("RethinkProvider") connection
	) {
		this.connection = connection
	}

	async createTable(tableName:string): Promise<rethink.CreateResult | null> {
		try {
			return await rethink.db("vivi").tableCreate(tableName).run(this.connection)
		} catch (error) {
			return null
		}
	}

	async insert(tableName:string, content:Object): Promise<rethink.WriteResult> {
		return await rethink.table(tableName).insert(content).run(this.connection)
	}
}
