import { FastifyInstance } from 'fastify'

import { UserWatchModel } from 'src/data/models/user-watch.model'
import { getStreamUrl } from 'src/data/utils/anime.util'

const localhostIps = ['::1', '127.0.0.1', 'localhost']
const isProd = process.env.NODE_ENV === 'production'

const getIp = (request: any) => {
  let clientIp = request.headers['x-forwarded-for'] || request.socket.remoteAddress
  clientIp = clientIp && Array.isArray(clientIp) ? clientIp[0] : clientIp
  if (isProd && (!clientIp || localhostIps.includes(clientIp))) {
    return undefined
  }
  return clientIp
}

async function router(server: FastifyInstance, _options: any) {
  server.get('/', async function (_request, reply) {
    return reply.view('index', { title: 'Hello World' })
  })

  server.get('/watch', async function (request, reply) {
    const { anime } = request.query as any
    const clientIp = getIp(request)

    const session = await UserWatchModel.findOne({ clientIp }).lean()
    const playerJsSession = JSON.stringify(session?.playerjsSession)

    return reply.view('watch', { title: `Watch ${anime}`, js: ['watch.js'], playerJsSession: playerJsSession })
  })

  server.get('/stream', async function (request, _reply) {
    const { url } = request.query as any
    const userAgent = request.headers['user-agent']

    const urlRes = await getStreamUrl(url, userAgent)

    if (!urlRes || !urlRes.videoUrl) {
      return ''
    }

    return urlRes.videoUrl
  })

  server.post('/sync-session', async function (request, reply) {
    const clientIp = getIp(request)

    if (!clientIp) {
      return reply.code(201).send()
    }

    const { session } = request.body as any

    if (!session) {
      return reply.code(201).send()
    }

    await UserWatchModel.updateOne(
      { clientIp },
      {
        $set: {
          playerjsSession: session,
        },
      },
      { upsert: true },
    )

    return reply.code(201).send()
  })
}

export default router
