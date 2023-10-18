import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../api/axios";

export const getListIndikatorKinerja = createAsyncThunk(
    "indikatorKinerja/getListIndikatorKinerja",
    async (payload) => {
        return await axiosPrivate.get(`/indikator_kinerja/${payload.id_sub_kegiatan}?search=${payload.search}&page=${payload.page}&limit=${payload.limit}`)
    }
)

export const importIndikatorKinerja = createAsyncThunk(
    "indikatorKinerja/importIndikatorKinerja",
    async (payload) => {
        return await axiosPrivate.post(`/indikator_kinerja/${payload.id_sub_kegiatan}/import`, {
            data: payload.data
        })
    }
)

export const uploadIndikatorKinerja = createAsyncThunk(
    "indikatorKinerja/uploadIndikatorKinerja",
    async (payload) => {
        return await axiosPrivate.post(`/indikator_kinerja/${payload.id}/upload`, {
            data: payload.data
        })
    }
)

const initialState = {
    list: {
        data: [],
        total: 0,
        isLoading: false,
        isError: false,
    },
    import: {
        isLoading: false,
        isError: false,
    },
    upload: {
        data: {},
        isLoading: false,
        isError: false,
    }
}

const indikatorKinerjaSlice = createSlice({
    name: "indikatorKinerja",
    initialState: initialState,
    extraReducers: (builder) => {
        // list
        builder.addCase(getListIndikatorKinerja.pending, (state) => {
            state.list.isLoading = true
        }),
            builder.addCase(getListIndikatorKinerja.fulfilled, (state, action) => {
                state.list.isLoading = false
                const { data, meta } = action.payload.data
                if (data) {
                    state.list.data = data.map((row, index) => ({
                        id: row.id,
                        key: row.id,
                        no: (meta.page - 1) * meta.limit + index + 1,
                        nama: row.nama,
                        target_capaian: row.target_capaian,
                        satuan_target_capaian: row.satuan_target_capaian,
                        target_anggaran: row.target_anggaran,
                    }))
                } else {
                    state.list.data = []
                }
                state.list.total = meta.total
            }),
            builder.addCase(getListIndikatorKinerja.rejected, (state) => {
                state.list.isLoading = false
                state.list.isError = true
            }),
            // import
            builder.addCase(importIndikatorKinerja.pending, (state) => {
                state.import.isLoading = true
            }),
            builder.addCase(importIndikatorKinerja.fulfilled, (state, action) => {
                console.log(action);
                state.import.isLoading = false
            }),
            builder.addCase(importIndikatorKinerja.rejected, (state) => {
                state.import.isLoading = false
                state.import.isError = true
            })
            // upload
            builder.addCase(uploadIndikatorKinerja.pending, (state) => {
                state.upload.isLoading = true
            }),
            builder.addCase(uploadIndikatorKinerja.fulfilled, (state, action) => {
                console.log(action);
                state.upload.isLoading = false
                const { data } = action.payload.data
                state.upload.data = data
            }),
            builder.addCase(uploadIndikatorKinerja.rejected, (state) => {
                state.upload.isLoading = false
                state.upload.isError = true
            })
    }
})

const { actions, reducer } = indikatorKinerjaSlice

export default reducer