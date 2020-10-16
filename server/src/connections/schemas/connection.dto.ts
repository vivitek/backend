import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';

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
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field(type => String)
    id: string

    @ApiProperty()
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field(type => String)
    routerId:string

    @ApiProperty()
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field(type => Boolean)
    treated:boolean

    @ApiProperty()
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field(type => String)
    address:string

    @ApiProperty()
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field(type => Date)
    createdAt: Date

    @ApiProperty()
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field(type => String)
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