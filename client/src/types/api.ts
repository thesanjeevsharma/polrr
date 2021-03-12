export interface NewsApiParams {
  from: string
  skip: number
}

export interface ApiResponse {
  success: boolean
  message: string
  data: any
}
