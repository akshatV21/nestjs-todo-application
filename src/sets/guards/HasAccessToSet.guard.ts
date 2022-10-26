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
    const set = req.query.setId

    const setExists = user.sets.includes(set)
    if (!setExists) throw new UnauthorizedException('Set does not exists')
    return true
  }
}
