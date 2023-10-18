import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterSlice from './feature/counter/counterSlice'
import pokemonSlice from './feature/pokemon/pokemonSlice'
import postSlice from './feature/post/postSlice'
import pegawaiSlice from './feature/pegawai/pegawaiSlice'
import authReducer from './feature/auth/authSlice'
import messageReducer from './feature/message'
import programReducer from './feature/program/programSlice'
import kegiatanReducer from './feature/kegiatan/kegiatanSlice'
import indikatorKinerjaReducer from './feature/indikator_kinerja/indikatorKinerjaSlice'

const reducer = combineReducers({
  counter: counterSlice,
  pokemon: pokemonSlice,
  post: postSlice,
  pegawai: pegawaiSlice,
  auth: authReducer,
  message: messageReducer,
  program: programReducer,
  kegiatan: kegiatanReducer,
  indikatorKinerja: indikatorKinerjaReducer,
})


const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: reducer,
  devTools: true
})

export default store