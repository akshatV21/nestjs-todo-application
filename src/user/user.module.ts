import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/models/user.model'
import { Authorize } from './guards/Authorize.guard'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, { provide: APP_GUARD, useClass: Authorize }],
})
export class UserModule {}
