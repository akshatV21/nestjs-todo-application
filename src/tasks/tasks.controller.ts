import { Controller, Post, UseGuards, Body, Get, Query, Patch } from '@nestjs/common'
import { get } from 'http'
import { Types } from 'mongoose'
import { UserDocument } from 'src/models/user.model'
import { CanAccessSet } from 'src/sets/guards/HasAccessToSet.guard'
import { Auth } from 'src/user/decorators/Auth.decorator'
import { ReqUser } from 'src/user/decorators/ReqUser.decorator'
import { TaskPayload } from './dtos/TaskPayload.dto'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Auth({ user: true })
  @UseGuards(new CanAccessSet())
  async createNewTask(@Body() taskPayload: TaskPayload, @ReqUser() user: UserDocument) {
    const task = await this.tasksService.create(taskPayload, user.id)
    return { success: true, message: 'Task created successfully', task }
  }

  @Get()
  @Auth()
  async getTasksBySet(@Query('setId') id: string) {
    const tasks = await this.tasksService.getBySet(id)
    return { success: true, message: 'Tasks fetched successfully', tasks }
  }

  @Patch()
  @Auth()
  async modifyTaskStatus(@Query('taskId') id: string, @ReqUser() userId: Types.ObjectId) {
    const task = await this.tasksService.modifyStatus(id, userId)
    return { success: true, message: 'Modified task status', task }
  }
}
