import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

const initialState = {
    loading: false,
    usuario:{},
    error: '',
    token: '',
    id: ''
}

export const traerUsuario = createAsyncThunk('usuarios/traerUsuario', async(id) => {
    return await Axios
        .get(`http://localhost:4000/usuario/${id}`)
        .then((response) => response.data.response)
        .catch((error) => console.log(error));
});

const adminSlice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
        nuevoUsuario: (state, action) => {
            state.usuarios = [...state.usuarios, action.payload];
        },
        register: (state, action) => {
            state.usuario = action.payload;
        }
    },extraReducers: (builder) => {
        
        /* Traer Usuario */
        builder.addCase(traerUsuario.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(traerUsuario.fulfilled, (state, action) => {
            state.loading = false;
            state.usuario = action.payload;
            state.error = '';
        });
        builder.addCase(traerUsuario.rejected, (state, action) => {
            state.loading = false;
            state.usuario = {};
            state.error = action.error.message;
        });
        
    },
});

export const { usuario } = adminSlice.actions;

export default adminSlice.reducer