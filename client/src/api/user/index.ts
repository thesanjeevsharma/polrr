import { ApiResponse, UserLoginApiParams } from 'types/api'

const url =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:4000/api/user`
    : `/api/user`

export const userLoginApi = async (
  userDetails: UserLoginApiParams
): Promise<ApiResponse> => {
  const data = await (
    await fetch(`${url}/google-login`, {
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  ).json()
  return data
}

export const toggleSaveApi = async (
  articleId: string,
  token: string
): Promise<ApiResponse> => {
  const data = await (
    await fetch(`${url}/toggle-save`, {
      body: JSON.stringify({
        articleId,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  ).json()
  return data
}
