import { ApiResponse, NewsApiParams } from 'types/api'

const url =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:4000/api/news`
    : `/api/news`

export const fetchNews = async (query: NewsApiParams): Promise<ApiResponse> => {
  const data = await (
    await fetch(
      `${url}?from=${query.from}&limit=${query.limit}&skip=${query.skip}`
    )
  ).json()
  return data
}
