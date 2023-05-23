import mongoose from 'mongoose'

export async function newDBConnection(dbUri: string) {
  await mongoose.connect(dbUri, {
    retryWrites: true,
    writeConcern: {
      w: 'majority',
    },
  })
  return mongoose.connection
}
