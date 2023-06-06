import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from "axios"
import { isRejectedWithValue } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    usuarios: [],
    error: ""
}
export const fetchUsuarios = createAsyncThunk("usuarios/fechUsuarios", async() => {
    return await Axios 
    .get ('http://localhost:4000/api/usuarios')
    .then((response) => response.data.response)
    .catch((error) => console.log(error))
}) 

export const registrarUsuario = createAsyncThunk("registrarusuario", async (body) => {
    try{
        const response = await Axios.post('http://localhost:4000/api/usuarios', body);
        return response.data
    }catch(error){
        isRejectedWithValue(error)
    }
})

const usuarioSlice = createSlice({
    name: "usuarios",
    initialState,
    reducers:{
        nuevoUsuario:(state, action) => {
            state.usuarios.push(action.payload) 
            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registrarUsuario.pending, (state) => {
            state.loading = true
        })
        builder.addCase(registrarUsuario.fulfilled, (state, action) => {
            state.loading = false
            state.usuarios = action.payload
            state.error = ""
        })
        builder.addCase(registrarUsuario.rejected, (state,action) =>{
            state.loading = false
            state.usuarios = []
            state.error = action.error.message
        }) 

        /* Fetch Ususarios */
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

export const { nuevoUsuario, usuarios } = usuarioSlice.actions;


export default usuarioSlice.reducer