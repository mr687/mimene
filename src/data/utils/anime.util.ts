import axios from 'axios'

export async function getStreamUrl(url: string) {
  const res = await axios
    .get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
      },
    })
    .catch(_ => null)

  if (!res) {
    return null
  }

  const videoConfigRegexp = /var\s+VIDEO_CONFIG\s*=\s*(\{.*)/
  const videoConfig = res.data.match(videoConfigRegexp)

  if (!videoConfig) {
    return null
  }

  const parsedVideoConfig = JSON.parse(videoConfig[1])
  if (!parsedVideoConfig.streams || !parsedVideoConfig.streams.length) {
    return null
  }

  const videoUrl = parsedVideoConfig.streams[0].play_url
  return {
    videoUrl,
    thumbnailUrl: parsedVideoConfig.thumbnail,
  }
}
