import { load as chererioLoad } from 'cheerio'

import { SourceDocument, SourceModel } from '../models/source.model'
import { getRawHttp } from '../utils/http.util'

export type OploverzAnime = 'one-piece'

async function getLatestEpisode(anime: OploverzAnime, { baseUrl }: SourceDocument) {
  const url = `${baseUrl}/anime/${anime}`
  const selectors = {
    episode: '.epcurlast',
    url: '.lastend .inepcx:last-child a',
  }

  const raw = await getRawHttp(url)
  const $ = chererioLoad(raw)

  const episode = $(selectors.episode).text().replace('Episode ', '')
  const urlEpisode = $(selectors.url).attr('href')

  return {
    episode: +episode,
    url: urlEpisode,
  }
}

export async function useOploverz(anime: OploverzAnime) {
  const sourceName = 'Oploverz'
  const config = await SourceModel.findOne({ name: sourceName })

  if (!config) {
    throw new Error(`Source ${sourceName} not found in our DB`)
  }

  return {
    getLatestEpisode: () => getLatestEpisode(anime, config),
  }
}
