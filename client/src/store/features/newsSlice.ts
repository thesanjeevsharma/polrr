import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { Article } from 'types/article'

interface NewsState {
  articles: Article[]
}

const initialState: NewsState = {
  articles: [],
}

export const newsSlice = createSlice({
  initialState,
  name: 'news',
  reducers: {
    add: (state, action: PayloadAction<Article[]>) => {
      state.articles = [...state.articles, ...action.payload]
    },
  },
})

export const { add } = newsSlice.actions

export const selectArticle = (state: RootState) => state.news

export default newsSlice.reducer
