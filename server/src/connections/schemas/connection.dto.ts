import { ApiProperty } from '@nestjs/swagger';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConnectionDto  {
    constructor(connection: Connection) {
        const {routerId, treated, address, createdAt, data} = connection
        this.routerId = routerId
        this.treated = treated
        this.address = address
        this.createdAt = createdAt
        this.data = data
        this.id = connection.id || ""
    }
    @ApiProperty()
    id: string

    @ApiProperty()
    routerId:string

    @ApiProperty()
    treated:boolean

    @ApiProperty()
    address:string

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    data:string
}

export interface Connection {
    id?: string
    routerId: string;
    treated: boolean;
    address: string;
    createdAt: Date;
    data: string;
}