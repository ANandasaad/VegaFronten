import { createSlice } from '@reduxjs/toolkit'

const intialState = {
  id: null,
  imageUrl: '',
  sectionName: '',
  articleHeading: '',
  created_at: '',
  updated_at: '',
  KnowledgeBankSubHeading: [],
}

const knowledgeBankSlice = createSlice({
  name: 'knowledgeBank',
  initialState: intialState,
  reducers: {
    setKnowledgeBank: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setKnowledgeBank } = knowledgeBankSlice.actions
export default knowledgeBankSlice.reducer
