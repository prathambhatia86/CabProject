import { configureStore } from '@reduxjs/toolkit'
import userReducer from './components/store/user'

export default configureStore({
    reducer: {
        user: userReducer
    }
})