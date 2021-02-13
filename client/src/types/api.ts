export interface NewsApiParams {
  skip: number
  limit: number
  from: string
}

export interface ApiResponse {
  success: boolean
  message: string
  data: any
}
