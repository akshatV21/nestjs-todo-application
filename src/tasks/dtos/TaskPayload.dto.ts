import { IsNotEmpty } from '@nestjs/class-validator'

export class TaskPayload {
  @IsNotEmpty()
  set: string

  @IsNotEmpty()
  task: string
}
