import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const BASE_URL = "https://api.instantwebtools.net"

export const getListPost = createAsyncThunk(
    "post/getListPost",
    async (param) => {
        return await axios.get(BASE_URL + `/v1/passenger?page=${param.page}&size=${param.limit}`)
    }
)

const initialState = {
    listPost: {
        data: [],
        total: 0,
        isLoading: false,
        isError: false,
    }
}

const pokemonSlice = createSlice({
    name: "post",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(getListPost.pending, (state) => {
            state.listPost.isLoading = true
        }),
        builder.addCase(getListPost.fulfilled, (state, action)=>{
            const {data, totalPassengers} = action.payload.data
            state.listPost.isLoading = false
            state.listPost.data = data.map(row=>({
                id: row._id,
                key: row._id,
                name: row.name,
                trips: row.trips
            }))
            state.listPost.total = totalPassengers
        }),
        builder.addCase(getListPost.rejected, (state)=>{
            state.listPost.isLoading = false
            state.listPost.isError = true
        })
    }
})

export default pokemonSlice.reducer