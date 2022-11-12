import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Ingredients, IngredientsSchema } from './ingredients.schema'
import { Categories, CategoriesSchema } from '../../categories/schemas/categories.schema'

export type RecipesDocument = Recipes & Document

@Schema()
export class Recipes {
    @Prop()
    title: string

    @Prop({ type: CategoriesSchema })
    category: Categories

    @Prop({ type: [IngredientsSchema] })
    ingredients: Ingredients[]

    @Prop()
    instruction: string

    @Prop()
    diff: string

    @Prop()
    time: string
}

export const RecipesSchema = SchemaFactory.createForClass(Recipes)
