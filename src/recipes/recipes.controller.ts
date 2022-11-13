import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common'
import { RecipesService } from './recipes.service'
import { RecipesDto } from './dto/recipes.dto'
import { Recipes } from './schemas/recipes.schema'
import { diskStorage } from 'multer'

import { v4 as uuidv4 } from 'uuid'

import path = require('path')
import { FileInterceptor } from '@nestjs/platform-express'
import { join } from 'path'

export const storage = {
    storage: diskStorage({
        destination: './uploads/recipeImg',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
            const extension: string = path.parse(file.originalname).ext

            cb(null, `${filename}${extension}`)
        },
    }),
}

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Get()
    getAll(): Promise<Recipes[]> {
        return this.recipesService.getAll()
    }

    @Get(':id')
    getById(@Param('id') id: string): Promise<Recipes> {
        return this.recipesService.getById(id)
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

    @Get('/by-category/:id')
    @HttpCode(200)
    async byCategory(@Param('id') id: string): Promise<Recipes[]> {
        return this.recipesService.byCategory(id)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Recipes> {
        return this.recipesService.remove(id)
    }

    @Post('upload')
    // @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('file', storage))
    uploadFile(
        @UploadedFile() file
        // @Request() req
    ) {
        // const category: CategoriesDto = req.user

        // return this.categoriesService.update(category?._id, {
        //     icon: file.filename,
        // })

        return { imagePath: `http://localhost:4000/recipes/recipe-img/${file.filename}` }
    }

    @Get('recipe-img/:imagename')
    @HttpCode(HttpStatus.OK)
    getCategoryIcons(@Param('imagename') imagename, @Res() res) {
        return res.sendFile(join(process.cwd(), 'uploads/recipeImg/' + imagename))
    }
}
