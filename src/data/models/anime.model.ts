import { Prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class AnimeSchema {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  eps: number

  @Prop({ required: true })
  serverUrl: number

  @Prop({ required: true })
  anime: string
}

export const AnimeModel = getModelForClass(AnimeSchema)
