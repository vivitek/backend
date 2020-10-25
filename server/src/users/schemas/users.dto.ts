import { ApiProperty } from '@nestjs/swagger';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
    @ApiProperty()
    email: string

	@ApiProperty()
	username:string

	@ApiProperty()
	_id:string

	constructor(email: string, username: string, id: string) {
		this.email = email
		this.username = username
		this._id = id
	}
}