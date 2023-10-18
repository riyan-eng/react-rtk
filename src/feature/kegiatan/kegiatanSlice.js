import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosPrivate } from "../../api/axios"

export const getListKegiatan = createAsyncThunk(
    "kegiatan/getListKegiatan",
    async (payload) => {
        return await axiosPrivate.get(`/sub_kegiatan/${payload.id_program}?search=${payload.search}&page=${payload.page}&limit=${payload.limit}`)
    }
)

export const getDetailKegiatan = createAsyncThunk(
    "kegiatan/getDetailKegiatan",
    async (payload) =>{
        return await axiosPrivate.get(`/sub_kegiatan/${payload.id}/detail`)
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

const kegiatanSlice = createSlice({
    name: "kegiatan",
    initialState: initialState,
    extraReducers:(builder)=>{
        // list
        builder.addCase(getListKegiatan.pending, (state)=>{
            state.list.isLoading = true
        }),
        builder.addCase(getListKegiatan.fulfilled, (state,action)=>{
            state.list.isLoading = false
            const { data, meta } = action.payload.data
            if (data) {
                state.list.data = data.map((row, index) => ({
                    id: row.id,
                    key: row.id,
                    no: (meta.page - 1) * meta.limit + index + 1,
                    nama: row.nama,
                    kode_rekening: row.kode_rekening,
                    alokasi_anggaran: row.alokasi_anggaran,
                    pptk: row.pptk,
                    rka: row.rka,
                    lpj: row.lpj,
                }))
            } else {
                state.list.data = []
            }
            state.list.total = meta.total
        }),
        builder.addCase(getListKegiatan.rejected, (state) => {
            state.list.isLoading = false
            state.list.isError = true
        }),
        // detail
        builder.addCase(getDetailKegiatan.pending, (state)=>{
            state.list.isLoading = true
        }),
        builder.addCase(getDetailKegiatan.fulfilled, (state,action)=>{
            state.detail.isLoading = false
            const { data } = action.payload.data
            if (data) {
                state.detail.data = data
            } else {
                state.detail.data = {}
            }
        }),
        builder.addCase(getDetailKegiatan.rejected, (state) => {
            state.detail.isLoading = false
            state.detail.isError = true
        })
    }
})

const { actions, reducer } = kegiatanSlice

export default reducer