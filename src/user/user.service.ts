import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async byId(_id: string) {
        const user = await this.userModel.findById(_id)

        if (!user) throw new NotFoundException('User not found')

        return user
    }
}
