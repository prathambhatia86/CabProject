import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
        },
        logout: (state, action) => {
            state.user = null;
        },
        change: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const { login, logout, change } = userSlice.actions

export default userSlice.reducer