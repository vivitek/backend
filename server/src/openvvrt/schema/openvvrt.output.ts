import { Field } from "@nestjs/graphql";

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