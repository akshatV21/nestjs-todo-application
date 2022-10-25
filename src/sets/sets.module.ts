import { Module } from '@nestjs/common'
import { SetsService } from './sets.service'
import { SetsController } from './sets.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/models/user.model'
import { Set, SetSchema } from 'src/models/set.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Set.name, schema: SetSchema },
    ]),
  ],
  controllers: [SetsController],
  providers: [SetsService],
})
export class SetsModule {}
