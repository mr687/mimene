import { Prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { HydratedDocument } from 'mongoose'

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class SourceSchema {
  @Prop({ required: true, unique: true })
  name: string

  @Prop({ required: true })
  baseUrl: string
}

export type SourceDocument = HydratedDocument<SourceSchema>
export const SourceModel = getModelForClass(SourceSchema)
