import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common'
import { Auth } from './decorators/Auth.decorator'
import { UserPayload } from './dtos/UserPayload.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @Auth({ isOpen: true })
  @UsePipes(new ValidationPipe())
  async httpRegisterUser(@Body() userPayload: UserPayload) {
    const user = await this.userService.register(userPayload)
    return { success: true, message: 'User registered successfully', user }
  }

  @Post('login')
  @Auth({ isOpen: true })
  @UsePipes(new ValidationPipe())
  async httpLoginUser(@Body() userPayload: UserPayload) {
    const user = await this.userService.login(userPayload)
    return { success: true, message: 'User logged in successfully', user }
  }
}
