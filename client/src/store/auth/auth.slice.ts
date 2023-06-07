import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./auth.actions";
import { IAuthInitialState } from "./auth.interface";


const initialState: IAuthInitialState = {
    user: null,
    isLoading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.user = payload.user;
            })
            .addCase(register.rejected, (state, {payload}) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.user = payload.user;
            })
            .addCase(login.rejected, (state, {payload}) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
            })
    }
})

