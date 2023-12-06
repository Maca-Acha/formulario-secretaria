import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from 'axios'

const initialState = {
    loading: false,
    filtro: "",
    organizacionFiltro: "",
    referenteFiltro: "",
    servicioFiltro: null,
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
export const usuariosPorServ = createAsyncThunk("usuarios/usuariosPorServ", async (servicio) => {
        return Axios.get(`http://localhost:4000/api/filtrados/servicio/${servicio}`)
        .then((response) => response.data.res)
        .catch((error) => console.log(error));
    }
);
export const filtroUsuarios = createAsyncThunk("usuarios/filtroUsuarios", async (filtros, thunkAPI) => {
    try {
        const response = await Axios.get("http://200.58.96.142:4000/api/filtrados", {params: filtros})
            .catch(error => console.error(error));
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

const filtroSlice = createSlice({
    name: "filtro",
    initialState,
    reducers: {
        //unificar y filtrar desde aca
        setFiltro: (state, action) => {
            console.log("setFiltro: ", action.payload)
            state.filtro = action.payload;
        },             
    },extraReducers: (builder) => {
        /* Filtrar todo */
        builder.addCase(filtroUsuarios.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(filtroUsuarios.fulfilled, (state, action) => {
            state.loading = false;
            state.filtro = action.payload;
            state.error = '';
        });
        builder.addCase(filtroUsuarios.rejected, (state, action) => {
            state.loading = false;
            state.usuarios = [];
            state.error = action.error.message;
        });
    }
});

export const { setFiltro } = filtroSlice.actions;
export default filtroSlice.reducer;
