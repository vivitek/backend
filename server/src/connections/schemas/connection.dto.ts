import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConnectionDto  {
    constructor(connection) {
        const {routerId, treated, address, createdAt, data} = connection
        this.routerId = routerId
        this.treated = treated
        this.address = address
        this.createdAt = createdAt
        this.data = data
        this.id = connection.id || ""
    }
    @ApiProperty()
    @Field(type => String)
    id: string

    @ApiProperty()
    @Field(type => String)
    routerId:string

    @ApiProperty()
    @Field(type => Boolean)
    treated:boolean

    @ApiProperty()
    @Field(type => String)
    address:string

    @ApiProperty()
    @Field(type => Date)
    createdAt: Date

    @ApiProperty()
    @Field(type => String)
    data:string
}