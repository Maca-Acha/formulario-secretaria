import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from "axios"

const initialState = {
    loading: false,
    usuarios: [],
    error: ""
}
export const fetchUsuarios = createAsyncThunk("usuarios/fechUsuarios", async() => {
    return await Axios 
    .get ('http://localhost:4000/api/usuarios')
    .then((response)=>response.data.response)
}) 

const usuarioSlice = createSlice({
    name: "usuarios",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsuarios.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUsuarios.fulfilled, (state, action) => {
            state.loading = false
            state.usuarios = action.payload
            state.error = ""
        })
        builder.addCase(fetchUsuarios.rejected, (state,action) =>{
            state.loading = false
            state.usuarios = []
            state.error = action.error.message
        })
    }

})



export const {  addUsuario } = usuarioSlice.actions 

export default usuarioSlice.reducer