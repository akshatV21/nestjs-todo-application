import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Set, SetDocument } from 'src/models/set.model'
import { Task, TaskDocument } from 'src/models/task.model'
import { UserDocument } from 'src/models/user.model'
import { TaskPayload } from './dtos/TaskPayload.dto'

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly TaskModel: Model<TaskDocument>,
    @InjectModel(Set.name) private readonly SetModel: Model<SetDocument>,
  ) {}

  async create(taskPayload: TaskPayload, userId: string) {
    const set = await this.SetModel.findById(taskPayload.set)
    const newTask = new this.TaskModel({ ...taskPayload, user: userId })

    set.tasks.push(newTask._id)
    await Promise.all([set.save(), newTask.save()])
    return newTask
  }

  async getBySet(id: string) {
    const tasks = await this.TaskModel.find({ set: id })
    return tasks
  }

  async modifyStatus(taskId: string, userId: Types.ObjectId) {
    const task = await this.TaskModel.findById(taskId)
    if (!task) throw new BadRequestException('Task does not exists')

    const userCanAccess = task.user === userId
    if (!userCanAccess) throw new UnauthorizedException('You cannot access this task!')

    task.completed = !task.completed
    await task.save()
    return task
  }
}
