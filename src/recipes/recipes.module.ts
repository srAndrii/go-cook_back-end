import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Categories, CategoriesSchema } from '../categories/schemas/categories.schema'
import { RecipesService } from './recipes.service'
import { RecipesController } from './recipes.controller'
import { Recipes, RecipesSchema } from './schemas/recipes.schema'
import { Ingredients, IngredientsSchema } from './schemas/ingredients.schema'

@Module({
    providers: [RecipesService],
    controllers: [RecipesController],
    imports: [
        MongooseModule.forFeature([
            { name: Recipes.name, schema: RecipesSchema },
            { name: Categories.name, schema: CategoriesSchema },
            { name: Ingredients.name, schema: IngredientsSchema },
        ]),
    ],
})
export class RecipesModule {}
