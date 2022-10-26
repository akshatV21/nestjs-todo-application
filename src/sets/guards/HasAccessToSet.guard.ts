import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { UserService } from 'src/user/user.service'

// guard to check if the set user is trying to access is actually his/her
@Injectable()
export class CanAccessSet implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest()
    const user = req.user
    const set = req.params.id

    const setExists = user.sets.includes(set)
    if (!setExists) throw new UnauthorizedException('You can not access this sey')
    return true
  }
}
