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
	async createDb(dbName:string): Promise<rethink.CreateResult | null> {
		try {
			return await rethink.dbCreate(dbName).run(this.connection)
		} catch (error) {
			return null
		}
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

	async getOne(tableName:string, id:string): Promise<Object> {
		return await rethink.table(tableName).get(id).run(this.connection)
	}

	async get(tableName:string, filter:object): Promise<rethink.Cursor> {
		return await rethink.table(tableName).filter(filter).run(this.connection)
	}

	async listen(tableName:string, filter:object, callback) {
		rethink.table(tableName).filter(filter).changes().run(this.connection, callback)
	}
}
