import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type UserDocument = User & Document

export interface IUser {
    email: string

    password: string

    isAdmin: boolean

    _id?: string
}
@Schema()
export class User {
    @Prop({ unique: true })
    email: string

    @Prop()
    password: string

    @Prop({ default: false })
    isAdmin: boolean

    @Prop()
    accessToken?: string

    @Prop()
    refreshToken?: string
}

export const UserSchema = SchemaFactory.createForClass(User)
