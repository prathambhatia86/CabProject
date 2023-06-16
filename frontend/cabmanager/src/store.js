import { configureStore } from '@reduxjs/toolkit'
import userReducer from './components/store/user'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage
};


const persistedReducer = persistReducer(persistConfig, userReducer);

export default configureStore({
    reducer: {
        user: persistedReducer,
        middleware: [thunk]
    }
})