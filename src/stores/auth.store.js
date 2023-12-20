import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isFetched: false,
        isAdmin: false,
        isLoggedIn: false
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn
            state.isAdmin = action.payload.isAdmin
        },
        logout(state) {
            state.isLoggedIn = false
            state.isAdmin = false
        }
    }
})

export default authSlice.reducer;
export const authAction = authSlice.actions;