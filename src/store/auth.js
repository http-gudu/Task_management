import { createSlice } from "@reduxjs/toolkit";
import Login from "../pages/login";

const authSlice = createSlice({
    name:"auth",
    initialState: {isLoggedIn: false},
    reducers:{
        Login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            state.isLoggedIn = false;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;