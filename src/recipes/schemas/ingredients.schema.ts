import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type IngredientsDocument = Ingredients & Document

@Schema()
export class Ingredients {
    @Prop()
    name: string

    @Prop()
    qty: string
}

export const IngredientsSchema = SchemaFactory.createForClass(Ingredients)
