import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import Axios from 'axios'

const initialState = {
    loading: false,
    servicios:[],
    error: '',
    id: ''
}

export const cargarServicio = createAsyncThunk('cargarServicios', async ({id, body}) => {
    try{
        const response = await Axios.post(`http://localhost:4000/api/servicios/${id}`, body);
        return response.data
    }catch(error){
        return isRejectedWithValue(error)
    }
})
export const traerServicios = createAsyncThunk('servicios/traerSegunUsuario', async(idUsuario) => {
    return await Axios
        .get(`http://localhost:4000/api/servicios/${idUsuario}`)
        .then((response) => response.data.response)
        .catch((error) => console.log(error));
        
});
export const editarServicio = createAsyncThunk(
    'editarServicio',
    async ({ id, body }) => {
        const nuevoServicio = await Axios.put(`http://localhost:4000/api/servicios/${id}`, body);
        return console.log(nuevoServicio.data.response)
    }
);
export const borrarServicio = createAsyncThunk(
    'borrarServicio',
    async ({ idServicio }) => {
        const nuevoServicio = await Axios.delete(`http://localhost:4000/api/servicios/${idServicio}`);
        return nuevoServicio.data.response
    }
);

const serviciosSlice = createSlice({
    name: 'servicios',
    initialState,
    reducers: {
        nuevoServicio: (state, action) => {
            state.servicios.push(action.payload);
        },
        
    },extraReducers: (builder) => {
        /* Cargar Servicio */
        builder.addCase(cargarServicio.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(cargarServicio.fulfilled, (state, action) => {
            state.loading = false;
            state.servicios = [...state.servicios, action.payload.response];
            state.error = '';
        });
        builder.addCase(cargarServicio.rejected, (state, action) => {
            state.loading = false;
            state.servicios = [];
            state.error = action.error.message;
        });
        /* Traer Servicios segun Usuario */
        builder.addCase(traerServicios.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(traerServicios.fulfilled, (state, action) => {
            state.loading = false;
            state.servicios = action.payload;
            state.error = '';
        });
        builder.addCase(traerServicios.rejected, (state, action) => {
            state.loading = false;
            state.servicios = [];
            state.error = action.error.message;
        });
        /* Editar Usuario */
        builder.addCase(editarServicio.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(editarServicio.fulfilled, (state, action) => {
            state.loading = false;
            state.servicios = action.payload;
            state.error = '';
        });
        builder.addCase(editarServicio.rejected, (state, action) => {
            state.loading = false;
            state.servicios = {};
            state.error = action.error.message;
        });
        /* Borrar Usuario */
        builder.addCase(borrarServicio.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(borrarServicio.fulfilled, (state, action) => {
            state.loading = false;
            state.servicios = action.payload;
            state.error = '';
        });
        builder.addCase(borrarServicio.rejected, (state, action) => {
            state.loading = false;
            state.servicios = {};
            state.error = action.error.message;
        });
        
    }, 
});

export const { servicios } = serviciosSlice.actions;

export default serviciosSlice.reducer