export interface NewsApiParams {
  from: string
  skip: number
}
export interface UserLoginApiParams {
  firstName: string
  lastName: string
  email: string
  googleId: string
  profileImage: string
}

export interface ApiResponse {
  success: boolean
  message: string
  data: any
}
