import { join as pathJoin } from 'path'

import * as fastify from 'fastify'

export async function runApp() {
  const server = fastify({
    logger: {
      transport: {
        target: '@fastify/one-line-logger',
      },
    },
  })

  await server.register(import('@fastify/helmet'), { contentSecurityPolicy: false })
  await server.register(import('@fastify/cors'), {
    origin: (origin, cb) => {
      if (!origin) {
        return cb(null, true)
      }
      const hostname = new URL(origin).hostname
      if (hostname === 'localhost') {
        //  Request from localhost will pass
        cb(null, true)
        return
      }
      // Generate an error on other origins, disabling access
      cb(new Error('Not allowed'), false)
    },
  })
  await server.register(import('@fastify/compress'), {})
  await server.register(import('@fastify/etag'))
  await server.register(require('@fastify/static'), {
    root: pathJoin(__dirname, '..', 'public'),
    prefix: '/public/',
    constraints: {},
  })
  await server.register(import('@fastify/view'), {
    engine: {
      handlebars: await import('handlebars'),
    },
    root: pathJoin(__dirname, '..', 'src', 'views'),
    layout: './templ/default',
    viewExt: 'html',
    options: {
      useHtmlMinifier: await import('html-minifier'),
      htmlMinifierOptions: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
      },
    },
  })

  await server.register(import('./router'))

  return server
}
