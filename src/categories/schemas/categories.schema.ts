import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type CategoriesDocument = Categories & Document

@Schema()
export class Categories {
    @Prop()
    title: string

    @Prop()
    icon?: string
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories)
