import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Recipes, RecipesDocument } from './schemas/recipes.schema'
import { Model, Types } from 'mongoose'
import { RecipesDto } from './dto/recipes.dto'

@Injectable()
export class RecipesService {
    constructor(@InjectModel(Recipes.name) private recipesModel: Model<RecipesDocument>) {}

    async getAll(): Promise<Recipes[]> {
        return this.recipesModel.find().exec()
    }

    async getById(id: string): Promise<Recipes> {
        return this.recipesModel.findById(id)
    }

    async create(recipesDto: RecipesDto): Promise<Recipes> {
        const newRecipes = new this.recipesModel(recipesDto)
        return newRecipes.save()
    }

    async update(id: string, recipesDto: RecipesDto): Promise<Recipes> {
        return this.recipesModel.findByIdAndUpdate(id, recipesDto, {
            new: true,
        })
    }

    async byCategory(id: string): Promise<Recipes[]> {
        const docs = await this.recipesModel
            .find({
                'category._id': id,
            })
            .exec()

        if (!docs) throw new NotFoundException('Recipes not  found')

        return docs
    }

    async remove(id: string): Promise<Recipes> {
        return this.recipesModel.findByIdAndRemove(id)
    }
}
