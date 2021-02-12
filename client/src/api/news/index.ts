import { ApiResponse, NewsApiParams } from 'types/api'

const url =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:4000/api/news`
    : `/api/news`

export const fetchNews = async (body: NewsApiParams): Promise<ApiResponse> => {
  const data = await (
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  ).json()
  return data
}
