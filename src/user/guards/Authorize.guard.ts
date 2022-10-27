import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { verify } from 'jsonwebtoken'
import { UserService } from '../user.service'
import { AuthOptions } from '../utils/types'

@Injectable()
export class Authorize implements CanActivate {
  constructor(private readonly userService: UserService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { isOpen, user } = this.reflector.get<AuthOptions>('authOptions', context.getHandler())
    // for routes which do not need authorization
    if (isOpen) return true

    const req = context.switchToHttp().getRequest()
    const authHeader = req.headers['authorization']
    if (!authHeader) throw new BadRequestException('Please log in first')
    const token = authHeader.split(' ')[1]
    const id = this.verifyToken(token)

    // fetching user before hand if user is true
    if (user) {
      const user = this.userService.getUser(id)
      req.user = user
    } else {
      req.user = id
    }
    return true
  }

  private verifyToken(token: string): any {
    return verify(token, process.env.JWT_TOKEN ?? 'hello', (err, id) => {
      if (err) throw new BadRequestException('Invalid Jwt token')
      return id
    })
  }
}
