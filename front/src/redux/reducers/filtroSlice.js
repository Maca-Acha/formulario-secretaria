import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from 'axios'

const initialState = {
    loading: false,
    filtro: "",
    organizacionFiltro: "",
    referenteFiltro: "",
    error: ""
};

export const filtrarUsuarios = createAsyncThunk('usuarios/filtrarUsuarios', async (filtro) => {
    return Axios.get(`http://200.58.96.142:4000/api/usuarios/filtrados?filtro=${encodeURIComponent(filtro)}`)
        .then((response) => response.data)
        .catch((error) => console.log(error));
});
export const usuariosPorOrga = createAsyncThunk('usuarios/UsuariosPorOrga', async (organizacion) => {
    return Axios.get(`http://200.58.96.142:4000/api/usuarios/filtrados/${organizacion}`)
        .then((response) => response.data.res)
        .catch((error) => console.log(error));
});
export const usuariosPorRef = createAsyncThunk('usuarios/UsuariosPorRef', async (referente) => {
    return Axios.get(`http://200.58.96.142:4000/api/filtrados/${referente}`)
        .then((response) => response.data.res)
        .catch((error) => console.log(error));
});


    
const filtroSlice = createSlice({
    name: "filtro",
    initialState,
    reducers: {
        setFiltro: (state, action) => {
            state.filtro = action.payload;
        },
        setOrganizacionFiltro: (state, action) => {
            state.organizacionFiltro = action.payload; 
        },
        setReferenteFiltro: (state, action) => {
            state.referenteFiltro = action.payload; 
        },
    },extraReducers: (builder) => {
        /* Filtrar Usuario */
        builder.addCase(filtrarUsuarios.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(filtrarUsuarios.fulfilled, (state, action) => {
            state.loading = false;
            state.usuarios = action.payload;
            state.error = '';
        });
        builder.addCase(filtrarUsuarios.rejected, (state, action) => {
            state.loading = false;
            state.usuarios = [];
            state.error = action.error.message;
        });
        /* Usuarios por Organizacion */
        builder.addCase(usuariosPorOrga.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(usuariosPorOrga.fulfilled, (state, action) => {
            state.loading = false;
            state.usuarios = action.payload;
            state.error = '';
        });
        builder.addCase(usuariosPorOrga.rejected, (state, action) => {
            state.loading = false;
            state.usuarios = [];
            state.error = action.error.message;
        });
        /* Usuarios por Referente */
        builder.addCase(usuariosPorRef.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(usuariosPorRef.fulfilled, (state, action) => {
            state.loading = false;
            state.usuarios = action.payload;
            state.error = '';
        });
        builder.addCase(usuariosPorRef.rejected, (state, action) => {
            state.loading = false;
            state.usuarios = [];
            state.error = action.error.message;
        });
    }
});

export const { setFiltro, setOrganizacionFiltro, setReferenteFiltro } = filtroSlice.actions;

export default filtroSlice.reducer;
