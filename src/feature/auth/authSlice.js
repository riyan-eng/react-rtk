import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../service/auth.service";
import { setMessage } from "../message";

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkApi) => {
        try {
            const response = await authService.login(email, password);
            return { data: response.data };
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            thunkApi.dispatch(setMessage(message))
            return thunkApi.rejectWithValue();
        }
    }
)

const initialState = {
    isLogin: false,
    isLoading: false,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.isLogin = false
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        }),
            builder.addCase(login.fulfilled, (state, actions) => {
                const { data } = actions.payload
                state.isLoading = false
                state.isLogin = true
                state.user = data.user
                localStorage.setItem("accessToken", data.access_token)
                localStorage.setItem("refreshToken", data.refresh_token)
            }),
            builder.addCase(login.rejected, (state) => {
                state.isLoading = false
                state.isLogin = false
                state.user = null
            })
    }
})

export const { logout } = authSlice.actions
const { reducer } = authSlice

export default reducer