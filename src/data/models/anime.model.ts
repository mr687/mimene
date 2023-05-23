import { Prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { HydratedDocument } from 'mongoose'

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class AnimeSchema {
  @Prop({ required: true })
  title: string

  @Prop({ required: true, index: true })
  eps: number

  @Prop({ required: true })
  serverUrl: string

  @Prop({ required: true, index: true })
  anime: string

  @Prop({ required: true })
  source: string
}

export type AnimeDocument = HydratedDocument<AnimeSchema>
export const AnimeModel = getModelForClass(AnimeSchema)
