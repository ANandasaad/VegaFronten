import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
  theme: 'light',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setUIState: (state, action) => {
      state.sidebarShow = action.payload.sidebarShow ?? action.payload
    },
  },
})

export const { setUIState } = uiSlice.actions
export default uiSlice.reducer
