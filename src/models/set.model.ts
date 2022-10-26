import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Task } from './task.model'

export type SetDocument = Set & Document

@Schema({ timestamps: true })
export class Set {
  @Prop({ required: true })
  user: Types.ObjectId

  @Prop({ required: true })
  name: string

  @Prop({ default: [], ref: 'Task' })
  tasks: Task[]
}

export const SetSchema = SchemaFactory.createForClass(Set)
