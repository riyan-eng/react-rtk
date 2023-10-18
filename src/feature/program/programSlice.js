import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosPrivate } from "../../api/axios"

export const getListProgram = createAsyncThunk(
    "program/getListProgram",
    async (payload) => {
        return await axiosPrivate.get(`/program?search=${payload.search}&page=${payload.page}&limit=${payload.limit}`)
    }
)

export const getDetailProgram = createAsyncThunk(
    "program/getDetailProgram",
    async (payload) =>{
        return await axiosPrivate.get(`/program/${payload.id}`)
    }
)

const initialState = {
    list: {
        data: [],
        total: 0,
        isLoading: false,
        isError: false,
    },
    detail: {
        data: {},
        isLoading: false,
        isError: false
    }
}

const programSlice = createSlice({
    name: "program",
    initialState: initialState,
    extraReducers:(builder)=>{
        // list
        builder.addCase(getListProgram.pending, (state)=>{
            state.list.isLoading = true
        }),
        builder.addCase(getListProgram.fulfilled, (state,action)=>{
            state.list.isLoading = false
            const { data, meta } = action.payload.data
            if (data) {
                state.list.data = data.map((row, index) => ({
                    id: row.id,
                    key: row.id,
                    no: (meta.page - 1) * meta.limit + index + 1,
                    nama: row.nama,
                }))
            } else {
                state.list.data = []
            }
            state.list.total = meta.total
        }),
        builder.addCase(getListProgram.rejected, (state) => {
            state.list.isLoading = false
            state.list.isError = true
        }),
        // detail
        builder.addCase(getDetailProgram.pending, (state)=>{
            state.list.isLoading = true
        }),
        builder.addCase(getDetailProgram.fulfilled, (state,action)=>{
            state.detail.isLoading = false
            const { data } = action.payload.data
            if (data) {
                state.detail.data = data
            } else {
                state.detail.data = {}
            }
        }),
        builder.addCase(getDetailProgram.rejected, (state) => {
            state.detail.isLoading = false
            state.detail.isError = true
        })
    }
})

const { actions, reducer } = programSlice

export default reducer