import { IsString } from 'class-validator'

export class CategoriesDto {
    @IsString()
    title: string

    @IsString()
    icon: string
}
