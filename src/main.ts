import 'dotenv/config'
import { startCase } from 'lodash'

import { newDBConnection } from './data/driver/mongodb'
import { runApp } from './server/server'

const port = +(process.env.PORT || 3000)
const mongoDBUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mimene'

newDBConnection(mongoDBUri)
  .then(connection => Promise.all([runApp(), connection]))
  .then(([server, connection]) => {
    server.log.info(`Connected to MongoDB: ${connection.db.databaseName}`)

    server.log.debug('Starting server..')
    return server.listen({ port })
  })
  .catch(console.error)
