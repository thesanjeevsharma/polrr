import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { Article } from 'types/article'
import { fetchNewsApi } from 'api'
import { NewsApiParams } from 'types/api'

interface NewsState {
  articles: Article[]
  currentlyReading: Article | null
  status: 'pending' | 'fulfilled' | 'rejected'
}

const initialState: NewsState = {
  articles: [],
  currentlyReading: null,
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
        return response.data.articles
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
      if (action.meta.arg.skip === 0) {
        state.articles = action.payload
      } else {
        state.articles = [...state.articles, ...action.payload]
      }
    })
    builder.addCase(fetchNews.pending, (state, action) => {
      if (action.meta.arg.skip === 0) {
        state.status = 'pending'
      } else {
        state.status = 'fulfilled'
      }
    })
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.status = 'rejected'
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
