import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from "axios"
import { isRejectedWithValue } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    usuarios: [],
    usuario:{},
    error: "",
    token: "",
    id: ""
}

export const fetchUsuarios = createAsyncThunk("usuarios/fechUsuarios", async() => {
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
    try {
        const usuario = await Axios.post("http://localhost:4000/api/inicio", { dni, contrasena });
        if (usuario.data.success && !usuario.data.error) {
            localStorage.setItem('token', usuario.data.response.token);
            return { token: usuario.data.response.token, id:usuario.data.response.dniExist._id };
        } else {
            console.log(usuario.data.error);
        }
    } catch (error) {
        return isRejectedWithValue(error);
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

const usuarioSlice = createSlice({
    name: "usuarios",
    initialState,
    reducers:{
        nuevoUsuario:(state, action) => {
            state.usuarios = [...state.usuarios, action.payload]
            
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

        /* Traer Usuario */
        builder.addCase(traerUsuario.pending, (state) => {
            state.loading = true
        })
        builder.addCase(traerUsuario.fulfilled, (state, action) => {
            state.loading = false
            state.usuario = action.payload
            state.error = ""
        })
        builder.addCase(traerUsuario.rejected, (state, action) => {
            state.loading = false;
            state.usuario = {};
            state.error = action.error.message;
        });

        /*Inicio Sesion */
        builder.addCase(signIn.pending, (state) => {
            state.loading = true
        })
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.id = action.payload.id
        })
        builder.addCase(signIn.rejected, (state, action) => {
            state.loading = false;
            state.usuarios = [];
            state.error = action.error.message;
        });
    }
})

export const { nuevoUsuario, usuarios } = usuarioSlice.actions;

export default usuarioSlice.reducer
