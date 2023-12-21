import { createSlice } from "@reduxjs/toolkit";

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        uname: '',
        isFetched: false,
        isAdmin: false,
        isLoggedIn: false
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn
            state.isAdmin = action.payload.isAdmin
            state.uname = capitalizeFirstLetter(action.payload.uname)
        },
        logout(state) {
            state.isLoggedIn = false
            state.isAdmin = false
            state.uname = ""
        }
    }
})

export default authSlice.reducer;
export const authAction = authSlice.actions;