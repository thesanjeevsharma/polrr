export interface NewsApiParams {
  lang: string
  page: number
  pageSize: number
  query: string
  sort: string
}

export interface ApiResponse {
  success: boolean
  message: string
  data: any
}
