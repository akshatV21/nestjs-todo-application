import { IsNotEmpty } from '@nestjs/class-validator'

export class UserPayload {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string
}
