import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
    @ApiProperty()
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field(type => String)
    email: string

	@ApiProperty()
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field(type => String)
	username:string

	constructor(email: string, username: string) {
		this.email = email
		this.username = username
	}
}