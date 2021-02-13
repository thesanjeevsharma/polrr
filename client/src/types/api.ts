export interface NewsApiParams {
  from: string
  limit: number
  skip: number
}

export interface ApiResponse {
  success: boolean
  message: string
  data: any
}
