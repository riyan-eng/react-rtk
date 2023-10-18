import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../api/axios";

export const getListPegawai = createAsyncThunk(
    "pegawai/getListPegawai",
    async (payload) => {
        return await axiosPrivate.get(`/pegawai?search=${payload.search}&page=${payload.page}&limit=${payload.limit}&kode_status_pegawai=${payload.kode_status_pegawai}`)
    }
)

const initialState = {
    listPegawai: {
        data: [],
        total: 0,
        isLoading: false,
        isError: false,
    }
}

const pegawaiSlice = createSlice({
    name: "pegawai",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(getListPegawai.pending, (state) => {
            state.listPegawai.isLoading = true
        }),
        builder.addCase(getListPegawai.fulfilled, (state, action) => {
            const { data, meta } = action.payload.data
            if (data) {
                state.listPegawai.data = data.map((row, index) => ({
                    id: row.id,
                    key: row.id,
                    no: (meta.page - 1) * meta.limit + index + 1,
                    nama: row.nama,
                    email: row.email,
                    nomor_identitas: row.nomor_identitas,
                    status_pegawai: row.status_pegawai,
                    jabatan_struktural: row.jabatan_struktural,
                    jabatan_fungsional: row.jabatan_fungsional,
                    golongan_pangkat: row.golongan_pangkat,
                    eselon: row.eselon,
                }))
            } else {
                state.listPegawai.data = []
            }
            state.listPegawai.isLoading = false
            state.listPegawai.total = meta.total
        }),
        builder.addCase(getListPegawai.rejected, (state) => {
            state.listPegawai.isLoading = false
            state.listPegawai.isError = true
        })
    }
})

const { actions, reducer } = pegawaiSlice

export default reducer