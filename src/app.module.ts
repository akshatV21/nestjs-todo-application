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
    MongooseModule.forRoot('mongodb+srv://akshat21:aku1985pika@cluster0.ew0oz.mongodb.net/todo_app?'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
