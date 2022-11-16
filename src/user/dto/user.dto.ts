import { IsBoolean, IsEmail, IsString } from 'class-validator'

export class UserDto {
    @IsEmail()
    email: string

    @IsString()
    password?: string

    @IsBoolean()
    isAdmin?: boolean

    @IsString()
    accessToken?: string

    @IsString()
    refreshToken?: string
}
