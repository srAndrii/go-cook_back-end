import { Injectable } from '@nestjs/common'
import { CategoriesDto } from './dto/categories.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Categories, CategoriesDocument } from './schemas/categories.schema'
import { Model } from 'mongoose'
import { Observable } from 'rxjs'

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Categories.name) private categoriesModel: Model<CategoriesDocument>) {}

    async getAll(): Promise<Categories[]> {
        return this.categoriesModel.find().exec()
    }

    async create(categoriesDto: CategoriesDto): Promise<Categories> {
        const newCategory = new this.categoriesModel(categoriesDto)
        return newCategory.save()
    }

    async remove(id: string): Promise<Categories> {
        return this.categoriesModel.findByIdAndRemove(id)
    }

    async update(id: string, categoriesDto: CategoriesDto): Promise<Categories> {
        return this.categoriesModel.findByIdAndUpdate(id, categoriesDto, {
            new: true,
        })
    }
}
