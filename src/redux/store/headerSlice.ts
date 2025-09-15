import { createSlice } from "@reduxjs/toolkit";

interface LoginAndRegisterState {
    showLogin: boolean;
    showRegister: boolean;
}

const initialState: LoginAndRegisterState = {
    showLogin: false,
    showRegister: false,
};

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        openLogin: (state) => {
            state.showLogin = true;
            state.showRegister = false;
        },

        closeLogin: (state) => {
            state.showLogin = false;
        },
        openRegister: (state) => {
            state.showRegister = true;
            state.showLogin = false;
        },
        closeRegister: (state) => {
            state.showRegister = false;
        }
    },
});

export const { openLogin, closeLogin, openRegister, closeRegister } = headerSlice.actions;
export default headerSlice.reducer;
