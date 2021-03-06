import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { Article } from 'types/article'

interface NewsState {
  articles: Article[]
  currentlyReading: Article | null
}

const initialState: NewsState = {
  articles: [],
  currentlyReading: null,
}

export const newsSlice = createSlice({
  initialState,
  name: 'news',
  reducers: {
    add: (state, action: PayloadAction<Article[]>) => {
      state.articles = [...state.articles, ...action.payload]
    },
    current: (state, action: PayloadAction<Article | null>) => {
      state.currentlyReading = action.payload
    },
  },
})

export const { add, current } = newsSlice.actions

export const selectArticle = (state: RootState) => state.news

export default newsSlice.reducer
