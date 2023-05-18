import { FastifyInstance } from 'fastify'

import { getStreamUrl } from 'src/data/utils/anime.util'

async function router(server: FastifyInstance, _options: any) {
  server.get('/', async function (_request, reply) {
    return reply.view('index', { title: 'Hello World' })
  })

  server.get('/watch', async function (request, reply) {
    const { anime } = request.query as any
    return reply.view('watch', { title: `Watch ${anime}`, js: ['playerjs.js', 'watch.js'] })
  })

  server.get('/stream', async function (request, _reply) {
    const { url } = request.query as any

    const urlRes = await getStreamUrl(url)

    if (!urlRes || !urlRes.videoUrl) {
      return ''
    }

    return urlRes.videoUrl
  })
}

export default router
