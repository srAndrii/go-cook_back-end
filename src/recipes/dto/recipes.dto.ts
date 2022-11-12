import { IsArray, IsObject, IsString } from 'class-validator'

export class RecipesDto {
    @IsString()
    title: string

    @IsObject()
    category: object

    @IsArray()
    ingredients: []

    @IsString()
    instruction: string

    @IsString()
    diff: string

    @IsString()
    time: string
}
