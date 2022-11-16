import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { AuthService } from './auth.service'
import { RefreshTokenDto } from './dto/refreshToken.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: AuthDto) {
        return this.authService.login(dto)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('register')
    async register(@Body() dto: AuthDto) {
        return this.authService.register(dto)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login/access-token')
    async getNewTokens(@Body() dto: RefreshTokenDto) {
        return this.authService.getNewTokens(dto)
    }

    @HttpCode(200)
    @Get('login/access/:id')
    async getById(@Param('id') id: string) {
        return this.authService.getById(id)
    }
}
