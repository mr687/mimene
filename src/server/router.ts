import { FastifyInstance } from 'fastify'
import { startCase } from 'lodash'

import { AnimeModel } from 'src/data/models/anime.model'
import { getStreamUrl } from 'src/data/utils/anime.util'

async function router(server: FastifyInstance, _options: any) {
  server.get('/', async function (_request, reply) {
    return reply.view('index', { title: 'Hello World' })
  })

  server.get('/:anime(^\\w+).txt', async function (request, reply) {
    const { anime } = request.params as any

    const animes = await AnimeModel.find({
      anime: startCase(anime),
    })

    return reply.send(animes.length)
  })

  server.get('/watch', async function (request, reply) {
    const { anime } = request.query as any
    return reply.view('watch', { title: `Watch ${anime}`, js: ['watch.js'] })
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
}

export default router
