import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
    @ApiProperty()
    @Field(type => String)
    email: string
    
	@ApiProperty()
    @Field(type => String)
	username:string

	constructor(email, username) {
		this.email = email
		this.username = username
	}

}