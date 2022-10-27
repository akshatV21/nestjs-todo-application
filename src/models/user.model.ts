import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { hashSync } from 'bcrypt'
import { Document } from 'mongoose'
import { Set } from './set.model'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string

  @Prop({ required: true })
  password: string

  @Prop({ default: [], ref: 'Set' })
  sets: Set[]

  _doc: any
}

const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  const hashedPassword = hashSync(this.password, 4)
  this.password = hashedPassword
  return next()
})

export { UserSchema }
