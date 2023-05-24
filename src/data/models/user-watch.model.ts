import { ModelOptions, Prop, Severity, getModelForClass } from '@typegoose/typegoose'
import { HydratedDocument } from 'mongoose'

@ModelOptions({ schemaOptions: { timestamps: true }, options: { allowMixed: Severity.ALLOW } })
export class UserWatchSchema {
  @Prop({ required: true })
  clientIp: string

  @Prop({ required: true })
  playerjsSession: Record<string, string>
}

export type UserWatchDocument = HydratedDocument<UserWatchSchema>
export const UserWatchModel = getModelForClass(UserWatchSchema)
