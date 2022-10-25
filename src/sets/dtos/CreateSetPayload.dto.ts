import { IsNotEmpty } from 'class-validator'

export class CreateSetPayload {
  @IsNotEmpty()
  name: string
}
