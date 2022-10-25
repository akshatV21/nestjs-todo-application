import { Body, Controller, Post } from '@nestjs/common'
import { UserDocument } from 'src/models/user.model'
import { Auth } from 'src/user/decorators/Auth.decorator'
import { ReqUser } from 'src/user/decorators/ReqUser.decorator'
import { CreateSetPayload } from './dtos/CreateSetPayload.dto'
import { SetsService } from './sets.service'

@Controller('sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  @Post()
  @Auth({ user: true })
  async httpCreateNewSet(@Body() setPayload: CreateSetPayload, @ReqUser() user: UserDocument) {
    const set = await this.setsService.create(setPayload, user)
    return { success: true, message: 'New set was created successfully', set }
  }
}
