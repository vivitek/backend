import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RouterCreationInput {
    @Field()
    url: string

    @Field()
    name: string

    @Field()
    certificat: string
}

@InputType()
export class RouterUpdateInput {
    @Field()
    id: string

    @Field({nullable:true})
    url?: string

    @Field({nullable:true})
    name?: string

    @Field({nullable: true})
    certificat?: string
}