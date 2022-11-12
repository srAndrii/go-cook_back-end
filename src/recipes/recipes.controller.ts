import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { RecipesService } from './recipes.service'
import { RecipesDto } from './dto/recipes.dto'
import { Recipes } from './schemas/recipes.schema'
import { Types } from 'mongoose'

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Get()
    getAll(): Promise<Recipes[]> {
        return this.recipesService.getAll()
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() recipe: RecipesDto): Promise<Recipes> {
        return this.recipesService.create(recipe)
    }

    @Put(':id')
    update(@Body() recipes: RecipesDto, @Param('id') id: string): Promise<Recipes> {
        return this.recipesService.update(id, recipes)
    }

    @Get('/by-category')
    @HttpCode(200)
    async byCategory(@Body() { _id }: Types.ObjectId): Promise<Recipes[]> {
        return this.recipesService.byCategory(_id)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Recipes> {
        return this.recipesService.remove(id)
    }
}
