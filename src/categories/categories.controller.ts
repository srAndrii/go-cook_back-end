import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
    Request,
    Res,
    HttpStatus,
} from '@nestjs/common'
import { CategoriesDto } from './dto/categories.dto'
import { CategoriesService } from './categories.service'
import { Categories } from './schemas/categories.schema'
import path = require('path')
import { join } from 'path'
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { FileInterceptor } from '@nestjs/platform-express'

export const storage = {
    storage: diskStorage({
        destination: './uploads/categoryIcons',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
            const extension: string = path.parse(file.originalname).ext

            cb(null, `${filename}${extension}`)
        },
    }),
}

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    getAll(): Promise<Categories[]> {
        return this.categoriesService.getAll()
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categories: CategoriesDto) {
        return this.categoriesService.create(categories)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(id)
    }

    @Put(':id')
    update(@Body() categories: CategoriesDto, @Param('id') id: string) {
        return this.categoriesService.update(id, categories)
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', storage))
    uploadFile(
        @UploadedFile() file
        // @Request() req
    ) {
        // const category: CategoriesDto = req.user

        // return this.categoriesService.update(category?._id, {
        //     icon: file.filename,
        // })

        return { imagePath: `http://localhost:4000/categories/category-icon/${file.filename}` }
    }

    @Get('category-icon/:imagename')
    @HttpCode(HttpStatus.OK)
    getCategoryIcons(@Param('imagename') imagename, @Res() res) {
        return res.sendFile(join(process.cwd(), 'uploads/categoryIcons/' + imagename))
    }
}
