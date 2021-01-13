import { Field, ObjectType } from '@nestjs/graphql';

export interface RouterCreation {
  name: string;
  url: string;
}

export interface RouterUpdate {
  name?: string;
  url?: string;
}

@ObjectType()
export class RouterDTO {
  constructor(data) {
    this._id = data._id;
    this.name = data.name;
    this.url = data.url;
  }

  @Field()
  _id: string;
  @Field()
  name: string;
  @Field()
  url: string;
}
