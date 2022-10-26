import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type TaskDocument = Task & Document

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true, ref: 'Set' })
  set: Types.ObjectId

  @Prop({ required: true, ref: 'User' })
  user: Types.ObjectId

  @Prop({ required: true })
  task: string

  @Prop({ default: false })
  completed: boolean
}

export const TaskSchema = SchemaFactory.createForClass(Task)
