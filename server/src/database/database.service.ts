import { Inject, Injectable } from '@nestjs/common';
import * as rethink from 'rethinkdb';

@Injectable()
export class DatabaseService {
  private connection: rethink.Connection;
  constructor(@Inject('RethinkProvider') connection: rethink.Connection) {
    this.connection = connection;
  }
  async createDb(dbName: string): Promise<rethink.CreateResult | null> {
    try {
      return await rethink.dbCreate(dbName).run(this.connection);
    } catch (error) {
      return null;
    }
  }
  async createTable(tableName: string): Promise<rethink.CreateResult | null> {
    try {
      return await rethink
        .db('vivi')
        .tableCreate(tableName)
        .run(this.connection);
    } catch (error) {
      return null;
    }
  }

  async insert(
    tableName: string,
    content: Object,
  ): Promise<rethink.WriteResult> {
    return await rethink
      .table(tableName)
      .insert(content)
      .run(this.connection);
  }

  //eslint-disable-next-line @typescript-eslint/ban-types
  async getOne(tableName: string, id: string): Promise<object> {
    return await rethink
      .table(tableName)
      .get(id)
      .run(this.connection);
  }

  async get(
    tableName: string,
    filter: Record<string, unknown>,
  ): Promise<rethink.Cursor> {
    return await rethink
      .table(tableName)
      .filter(filter)
      .run(this.connection);
  }

  async listen(
    tableName: string,
    filter: Record<string, unknown>,
    callback: (err: Error, result: any) => void,
  ): Promise<void> {
    rethink
      .table(tableName)
      .filter(filter)
      .changes()
      .run(this.connection, callback);
  }
}
