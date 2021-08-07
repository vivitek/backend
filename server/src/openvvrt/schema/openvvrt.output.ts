import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Cpu {
    @Field(() => String)
    name: string;
    @Field(() => Number)
    user: number;
    @Field(() => Number)
    sys: number;
    @Field(() => Number)
    used: number;
    @Field(() => Number)
    idle: number;
}


@ObjectType()
export class Ram {
    @Field(() => Number)
    total: number
    @Field(() => Number)
    used: number
    @Field(() => Number)
    left: number
    @Field(() => Number)
    percentage: number
}

@ObjectType()
export class Storage {
    @Field(() => String)
    fs: string
    @Field(() => Number)
    total: number
    @Field(() => Number)
    used: number
    @Field(() => Number)
    left: number
    @Field(() => Number)
    percent: number
}