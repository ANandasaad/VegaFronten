// import { legacy_createStore as createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
//   theme: 'light',
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   console.log(type, rest)
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store

import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './slice/uiSlice.js'
import knowledgeBankReducer from './slice/knowledgeBankSlice.js'

const store = configureStore({
  reducer: {
    ui: uiReducer,
    knowledgeBank: knowledgeBankReducer,
  },
})

export default store
