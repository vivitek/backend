import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({required: true, unique: true})
    email!: string;

    @Prop({required: true})
    pass!: string;

    @Prop({required: true})
    firstname!: string;

    @Prop({required: true})
    lastname!: string;

    @Prop({required: true})
    telephoneNumber!: string;

    @Prop()
    routers!: [string]
}

export const UserSchema = SchemaFactory.createForClass(User);