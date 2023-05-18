import 'dotenv/config'
import { runApp } from './server/server'

const port = +(process.env.PORT || 3000)
runApp()
  .then(server => server.listen({ port }))
  .catch(console.error)
