import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IUser, User, UserDocument } from '../user/schemas/user.schema'
import { genSalt, hash, compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { RefreshTokenDto } from './dto/refreshToken.dto'

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService) {}

    async login(dto: AuthDto) {
        const user = await this.validateUser(dto)
        const tokens = await this.issueTokenPair(String(user._id))
        return {
            user: this.returnUserFields(user),
            ...tokens,
        }
    }

    async register(dto: AuthDto) {
        const oldUser = await this.userModel.findOne({ email: dto.email })
        if (oldUser) {
            throw new BadRequestException('User with this email is already in the system')
        }
        const salt = await genSalt(10)

        const newUser = new this.userModel({
            email: dto.email,
            password: await hash(dto.password, salt),
        })

        const user = await newUser.save()
        const tokens = await this.issueTokenPair(String(user._id))
        return {
            user: this.returnUserFields(user),
            ...tokens,
        }
    }

    async getById(id: string) {
        console.log(this.userModel.findById(id))
        return this.userModel.findById(id)
    }

    async getNewTokens({ refreshToken }: RefreshTokenDto) {
        if (!refreshToken) throw new UnauthorizedException('Please sign in!')

        const result = await this.jwtService.verifyAsync(refreshToken)

        if (!result) throw new UnauthorizedException('Invalid token or expired')

        const user = await this.userModel.findById('6374f57f23c9e3a7f70eee25')

        const tokens = await this.issueTokenPair('6374f57f23c9e3a7f70eee25')

        return {
            user: this.returnUserFields(user),
            ...tokens,
        }
    }

    async validateUser(dto: AuthDto) {
        const user = await this.userModel.findOne({ email: dto.email })
        if (!user) throw new UnauthorizedException('User not found')

        const isValidPassword = await compare(dto.password, user.password)
        if (!isValidPassword) throw new UnauthorizedException('Invalid password')

        return user
    }

    async issueTokenPair(userId: string) {
        const data = { _id: userId }
        const refreshToken = await this.jwtService.signAsync(data, {
            expiresIn: '15d',
        })
        const accessToken = await this.jwtService.signAsync(data, {
            expiresIn: '1h',
        })
        return { refreshToken, accessToken }
    }

    returnUserFields(user: IUser) {
        return {
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
        }
    }
}
