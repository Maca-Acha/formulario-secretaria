import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from "axios"

const initialState = {
    loading: false,
    archivos: [],
    error: ""
}

export const fetchArchivos = createAsyncThunk("archivos/fechArchivos", async() => {
    return await Axios 
    .get ('/archivos')
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
}) 

const archivosSlice = createSlice({
    name: "archivos",
    initialState,
    reducers:{
        nuevoArchivo:(state, action) => {
            state.archivos.push(action.payload) 
            
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchArchivos.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchArchivos.fulfilled, (state, action) => {
            state.loading = false
            state.usuarios = action.payload
            state.error = ""
        })
        builder.addCase(fetchArchivos.rejected, (state,action) =>{
            state.loading = false
            state.usuarios = []
            state.error = action.error.message
        })
    }
})

export const {  arcivos, nuevoArchivo } = fetchArchivos.actions;


export default archivosSlice.reducer