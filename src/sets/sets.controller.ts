import { Body, Controller, Post, UseGuards, Query, Get } from '@nestjs/common'
import { UserDocument } from 'src/models/user.model'
import { Auth } from 'src/user/decorators/Auth.decorator'
import { ReqUser } from 'src/user/decorators/ReqUser.decorator'
import { CreateSetPayload } from './dtos/CreateSetPayload.dto'
import { CanAccessSet } from './guards/HasAccessToSet.guard'
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

  @Get(':id')
  @Auth({ user: true })
  @UseGuards(new CanAccessSet())
  async getSingleSet(@Query('setId') id: string) {
    const set = await this.setsService.getSingle(id)
    return { success: true, message: 'Set was successfully retrieved', set }
  }

  @Get()
  @Auth()
  async getUserSets(@ReqUser() userId: string) {
    const sets = await this.setsService.getUserSets(userId)
    return { success: true, message: 'Sets were successfully retrieved', sets }
  }
}
