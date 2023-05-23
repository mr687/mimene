import axios from 'axios'

export async function getRawHttp(url: string) {
  const { data } = await axios.get(url)
  return data
}
