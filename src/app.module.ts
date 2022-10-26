import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { SetsModule } from './sets/sets.module'
import { TasksModule } from './tasks/tasks.module'

@Module({
  imports: [UserModule, SetsModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
