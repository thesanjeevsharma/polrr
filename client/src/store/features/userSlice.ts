import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  userDetailsApi,
  userLoginApi,
  userSavedArticlesApi,
  toggleSaveApi,
} from 'api/user'
import { RootState } from 'store'
import { UserLoginApiParams } from 'types/api'
import { Article } from 'types/article'
import { User } from 'types/user'

interface UserState {
  isLoggedIn: boolean
  likedArticles: Article[]
  savedArticles: Article[]
  status: 'pending' | 'fulfilled' | 'rejected'
  token: string | null
  user: User | null
  userStatus: 'pending' | 'fulfilled' | 'rejected'
}

const initialState: UserState = {
  isLoggedIn: false,
  likedArticles: [],
  savedArticles: [],
  status: 'pending',
  token: null,
  user: null,
  userStatus: 'pending',
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

export const loadUser = createAsyncThunk(
  'user/loadUser',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await userDetailsApi(token)
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

export const loadSavedArticles = createAsyncThunk(
  'user/loadSavedArticles',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await userSavedArticlesApi(token)
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
    builder.addCase(loadUser.pending, (state, action) => {
      state.userStatus = 'pending'
    })
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload.user
      state.token = action.meta.arg
      state.userStatus = 'fulfilled'
    })
    builder.addCase(loadUser.rejected, (state) => {
      state.user = null
      state.token = null
      state.isLoggedIn = false
      localStorage.removeItem('polrr-token')
      state.userStatus = 'rejected'
    })
    builder.addCase(loadSavedArticles.fulfilled, (state, action) => {
      state.savedArticles = action.payload.articles
      state.status = 'fulfilled'
    })
    builder.addCase(loadSavedArticles.pending, (state) => {
      state.status = 'pending'
    })
    builder.addCase(loadSavedArticles.rejected, (state) => {
      state.status = 'rejected'
    })
  },
  initialState,
  name: 'user',
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isLoggedIn = false
      state.userStatus = 'fulfilled'
      localStorage.removeItem('polrr-token')
    },
  },
})

export const { logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
