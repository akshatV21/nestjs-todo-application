import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { SetsModule } from './sets/sets.module'
import { TasksModule } from './tasks/tasks.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    UserModule,
    SetsModule,
    TasksModule,
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
