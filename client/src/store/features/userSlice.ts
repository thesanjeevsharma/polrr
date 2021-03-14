import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userLoginApi, toggleSaveApi } from 'api/user'
import { RootState } from 'store'
import { UserLoginApiParams } from 'types/api'
import { User } from 'types/user'

interface UserState {
  isLoggedIn: boolean
  token: string | null
  user: User | null
}

const initialState: UserState = {
  isLoggedIn: false,
  token: null,
  user: null,
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userDetails: UserLoginApiParams, { rejectWithValue }) => {
    try {
      const response = await userLoginApi(userDetails)
      if (response.success) {
        return response.data
      }
      throw Error(response.message)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const toggleSave = createAsyncThunk(
  'user/toggleSave',
  async (
    { articleId, token }: { articleId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await toggleSaveApi(articleId, token)
      if (response.success) {
        return response.data
      }
      throw Error(response.message)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const userSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem('polrr-token', action.payload.token)
    })
    builder.addCase(loginUser.rejected, (state) => {
      state.user = null
      state.token = null
      state.isLoggedIn = false
    })
    builder.addCase(toggleSave.fulfilled, (state, action) => {
      if (state.user) {
        state.user.savedArticles = action.payload.savedArticles
      }
    })
  },
  initialState,
  name: 'user',
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isLoggedIn = false
      localStorage.removeItem('polrr-token')
    },
  },
})

export const { logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
