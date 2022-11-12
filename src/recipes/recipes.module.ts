import { Module } from '@nestjs/common'
import { CategoriesService } from '../categories/categories.service'
import { CategoriesController } from '../categories/categories.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Categories, CategoriesSchema } from '../categories/schemas/categories.schema'
import { RecipesService } from './recipes.service'
import { RecipesController } from './recipes.controller'
import { Recipes, RecipesSchema } from './schemas/recipes.schema'

@Module({
    providers: [RecipesService],
    controllers: [RecipesController],
    imports: [MongooseModule.forFeature([{ name: Recipes.name, schema: RecipesSchema }])],
})
export class RecipesModule {}
