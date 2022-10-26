import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Set, SetDocument } from 'src/models/set.model'
import { UserDocument } from 'src/models/user.model'
import { CreateSetPayload } from './dtos/CreateSetPayload.dto'

@Injectable()
export class SetsService {
  constructor(@InjectModel(Set.name) private readonly SetModel: Model<SetDocument>) {}

  async create(setPayload: CreateSetPayload, user: UserDocument) {
    const set = new this.SetModel({ ...setPayload, user: user._id })
    user.sets.push(set._id)
    await Promise.all([user.save(), set.save()])
    return Set
  }

  async getUserSets(userId: string) {
    const sets = await this.SetModel.find({ user: userId })
    return sets
  }

  async getSingle(id: string) {
    const set = await this.SetModel.findById(id)
    return set
  }
}
