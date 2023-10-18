import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/"

export const getAllPokemon = createAsyncThunk(
    "pokemon/getAllPokemon",
    async () => {
        return await axios.get(BASE_URL + "pokemon")
    }
)

const initialState = {
    allPokemon: {
        count: 0,
        next: "",
        prev: "",
        result: [],
        isLoading: false
    }
}

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: initialState,
    extraReducers: (builder)=>{
        // loading
        builder.addCase(getAllPokemon.pending, (state)=>{
            state.allPokemon.isLoading = true
        }), 
        // berhasil
        builder.addCase(getAllPokemon.fulfilled, (state, action)=>{
            const {count, next, previous, results} = action.payload.data
            state.allPokemon.isLoading = false
            state.allPokemon.count = count
            state.allPokemon.next = next
            state.allPokemon.prev = previous
            state.allPokemon.result = results
        }),
        // gagal
        builder.addCase(getAllPokemon.rejected, (state)=>{
            state.allPokemon.isLoading = false
        })
    }
})

export default pokemonSlice.reducer