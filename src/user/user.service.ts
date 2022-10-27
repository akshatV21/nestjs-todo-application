import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { compareSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Model } from 'mongoose'
import { User, UserDocument } from 'src/models/user.model'
import { UserPayload } from './dtos/UserPayload.dto'

@Injectable()
export class UserService {
  // getting access to User model
  constructor(@InjectModel(User.name) private readonly UserModel: Model<UserDocument>) {}

  async register(userPayload: UserPayload) {
    const user = new this.UserModel(userPayload)
    await user.save()
    const { password, ...rest } = user._doc
    return rest
  }

  async login(userPayload: UserPayload) {
    const registeredUser = await this.UserModel.findOne({ username: userPayload.username })
    if (!registeredUser) throw new BadRequestException('User does not exists')

    const passwordMatches = compareSync(userPayload.password, registeredUser.password)
    if (!passwordMatches) throw new BadRequestException('Incorrect password')

    const token = sign(registeredUser.id, process.env.JWT_SECRET ?? 'hello')
    const { password, ...rest } = registeredUser._doc
    return { ...rest, token }
  }

  async getUser(id: string) {
    const user = await this.UserModel.findById(id)
    if (!user) throw new BadRequestException('User does not exists')
    return user
  }
}
