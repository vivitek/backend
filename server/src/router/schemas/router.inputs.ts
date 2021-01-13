import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RouterCreationInput {
    @Field()
    url: string

    @Field()
    name: string
}

@InputType()
export class RouterUpdateInput {
    @Field({nullable:true})
    url ?: string
    @Field({nullable:true})
    name ?: string
    @Field()
    id: string
}