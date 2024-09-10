import { configureStore } from '@reduxjs/toolkit'
import inboxSlice from '../features/inboxSlice'
import AuthSlice from '../features/auth'


const reducer = {
  inbox:inboxSlice,
  auth: AuthSlice
}

const store = configureStore({
  reducer: reducer
    
  
})

export default store