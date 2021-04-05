import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { Article } from 'types/article'
import { fetchNewsApi } from 'api'
import { NewsApiParams } from 'types/api'

interface NewsState {
  articles: Article[]
  count: number
  currentlyReading: Article | null
  loadMoreStatus: 'pending' | 'fulfilled' | 'rejected'
  status: 'pending' | 'fulfilled' | 'rejected'
}

const initialState: NewsState = {
  articles: [],
  count: 0,
  currentlyReading: null,
  loadMoreStatus: 'fulfilled',
  status: 'pending',
}

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ from, skip }: NewsApiParams, { rejectWithValue }) => {
    try {
      const response = await fetchNewsApi({
        from,
        skip,
      })
      if (response.success) {
        return response.data
      }
      throw Error(response.message)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const newsSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.loadMoreStatus = 'fulfilled'
      if (action.meta.arg.skip === 0) {
        state.articles = action.payload.articles
        state.count = action.payload.count
      } else {
        state.articles = [...state.articles, ...action.payload.articles]
      }
    })
    builder.addCase(fetchNews.pending, (state, action) => {
      if (action.meta.arg.skip === 0) {
        state.status = 'pending'
      } else {
        state.loadMoreStatus = 'pending'
        state.status = 'fulfilled'
      }
    })
    builder.addCase(fetchNews.rejected, (state, action) => {
      if (action.meta.arg.skip === 0) {
        state.status = 'rejected'
      } else {
        state.loadMoreStatus = 'rejected'
      }
    })
  },
  initialState,
  name: 'news',
  reducers: {
    current: (state, action: PayloadAction<Article | null>) => {
      state.currentlyReading = action.payload
    },
  },
})

export const { current } = newsSlice.actions

export const selectArticle = (state: RootState) => state.news

export default newsSlice.reducer
