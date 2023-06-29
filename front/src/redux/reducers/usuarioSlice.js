import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import Axios from "axios"

const initialState = {
    loading: false,
    usuarios: [],
    usuario:{},
    error: "",
    token: "",
    id: ""
}

export const fetchUsuarios = createAsyncThunk("usuarios/fetchUsuarios", async() => {
    return await Axios 
    .get ('http://localhost:4000/api/usuarios')
    .then((response) => response.data.response)
    .catch((error) => console.log(error))
}) 
export const traerUsuario = createAsyncThunk("usuarios/traerUsuario", async(id) => {
    return await Axios
        .get(`http://localhost:4000/usuario/${id}`)
        .then((response) => response.data.response)
        .catch((error) => console.log(error));
});
export const signIn = createAsyncThunk("usuarios/signIn", async ({ dni, contrasena }) => {
    console.log(dni)
    try {
        const usuario = await Axios.post("http://localhost:4000/api/inicio", { dni, contrasena });
        console.log(usuario)
        if (usuario.data.success && !usuario.data.error) {
        localStorage.setItem('token', usuario.data.response.token);
        return { token: usuario.data.response.token, id:usuario.data.response.dniExist._id };
        } else {
        return { error: usuario.data.error };
        }
    } catch (error) {
        return { error: error.message };
    }
})

export const signToken = createAsyncThunk("usuarios/signToken", async() =>{
        try {
            const token = localStorage.getItem("token")
            const response = await Axios.get("http://localhost:4000/api/usuarios",{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        }catch(error){
            return isRejectedWithValue(error)
        }
})
export const registrarUsuario = createAsyncThunk("registrarusuario", async (body) => {
    try{
        const response = await Axios.post('http://localhost:4000/api/usuarios', body);
        return response.data
    }catch(error){
        return isRejectedWithValue(error)
    }
})
export const editarUsuario = createAsyncThunk("editarUsuario", async ({id, body}) => {
    const token = localStorage.getItem("token")
    return (    
        await Axios.put(`http://localhost:4000/usuario/${id}` , body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
        await Axios.get(`http://localhost:4000/usuario/${id}`)
        )
})

const usuarioSlice = createSlice({
    name: 'usuarios',
    initialState,
    reducers: {
        nuevoUsuario: (state, action) => {
            state.usuarios = [...state.usuarios, action.payload];
        },
    },extraReducers: (builder) => {
        /* Registrar Usuario */
        builder.addCase(registrarUsuario.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registrarUsuario.fulfilled, (state, action) => {
            state.loading = false;
            state.usuarios = action.payload;
            state.error = "";
        });
        builder.addCase(registrarUsuario.rejected, (state, action) => {
            state.loading = false;
            state.usuarios = [];
            state.error = action.error.message;
        });
    
        /* Fetch Usuarios */
        builder.addCase(fetchUsuarios.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsuarios.fulfilled, (state, action) => {
            state.loading = false;
            state.usuarios = action.payload;
            state.error = "";
        });
        builder.addCase(fetchUsuarios.rejected, (state, action) => {
            state.loading = false;
            state.usuarios = [];
            state.error = action.error.message;
        });
    
        /* Traer Usuario */
        builder.addCase(traerUsuario.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(traerUsuario.fulfilled, (state, action) => {
            state.loading = false;
            state.usuario = action.payload;
            state.error = "";
        });
        builder.addCase(traerUsuario.rejected, (state, action) => {
            state.loading = false;
            state.usuario = {};
            state.error = action.error.message;
        });
    
        /* Inicio Sesión */
        builder.addCase(signIn.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.error = "";
        });
        builder.addCase(signIn.rejected, (state, action) => {
            state.loading = false;
            state.usuarios = [];
            state.error = action.error.message;
        });
    
        /* Editar Usuario */
        builder.addCase(editarUsuario.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(editarUsuario.fulfilled, (state, action) => {
            state.loading = false;
            state.usuario = action.payload;
            state.error = "";
        });
        builder.addCase(editarUsuario.rejected, (state, action) => {
            state.loading = false;
            state.usuarios = [];
            state.error = action.error.message;
        });
    },
});

export const { nuevoUsuario, usuarios } = usuarioSlice.actions;

export default usuarioSlice.reducer

