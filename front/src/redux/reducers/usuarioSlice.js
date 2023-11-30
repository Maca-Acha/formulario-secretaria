import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import Axios from 'axios'
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    usuarios: [],
    usuario:{},
    error: '',
    token: '',
    id: '',
    rol:''
}


const exitoNotificacion = (message) => {
    toast.success(message);
};

export const registerActionToolkit = createAsyncThunk('usuarios/register', async (key) => {
    return({
        type: 'usuarios/register',
        payload: key,
    });
});
export const fetchUsuarios = createAsyncThunk('usuarios/fetchUsuarios', async() => {
    return Axios.get('http://200.58.96.142:4000/api/usuarios')
    .then((response) => response.data.response)
    .catch((error) => console.log(error));
});
export const traerUsuario = createAsyncThunk('usuarios/traerUsuario', async(id) => {
    return await Axios
        .get(`http://200.58.96.142:4000/usuario/${id}`)
        .then((response) => response.data.response)
        .catch((error) => console.log(error));
});
export const signIn = createAsyncThunk('usuarios/signIn', async ({ dni, contrasena }) => {
    try {
        const usuario = await Axios.post('http://200.58.96.142:4000/api/inicio', { dni, contrasena });
        if (usuario.data.success && !usuario.data.error) {
            localStorage.setItem('token', usuario.data.response.token);
            return { token: usuario.data.response.token, id:usuario.data.response.dniExist._id, rol:usuario.data.response.dniExist.rol };
        } else {
            toast.error(usuario.data.error, {
                position: toast.POSITION.TOP_RIGHT
            });
            
            return { error: usuario.data.error };
        }
        
    } catch (error) {
        toast.error(error, {
            position: toast.POSITION.TOP_RIGHT
        });
        return { error: error.message };
    }
})
export const signToken = createAsyncThunk('usuarios/signToken', async() =>{
        try {
            const token = localStorage.getItem('token')
            const response = await Axios.get('http://200.58.96.142:4000/api/usuarios',{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        }catch(error){
            return isRejectedWithValue(error)
        }
})
export const cerrarSesion = createAsyncThunk('usuarios/cerrarSesion', async() =>{
    localStorage.removeItem('token')
    return {}
})
export const registrarUsuario = createAsyncThunk('registrarusuario', async (body) => {
    try{
        const response = await Axios.post('http://200.58.96.142:4000/api/usuarios', body);
        if(response.data.response.nuevoUsuario.rol === "admin"){
            toast.success('Haz registrado a un administrador', {
                position: toast.POSITION.TOP_RIGHT
            });
        }else{
            toast.success('Te haz registrado correctamente', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        return response.data
    }catch(error){
        toast.error("Lo sentimos! Error al registrarse. Verifique que todos los campos esten completos", {
            position: toast.POSITION.TOP_RIGHT
        });
        return isRejectedWithValue(error)
    }
})
export const editarUsuario = createAsyncThunk('editarUsuario', async ({ id, body }) => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const nuevoUser = await Axios.put(`http://200.58.96.142:4000/usuario/${id}`, body, { headers });
        return nuevoUser.data.response
    }
);
export const agregarServicioUsuario = createAsyncThunk('agregarServicioUsuario', 
    async ({ usuarioId, servicioId }) => {
        return Axios.put(`http://200.58.96.142:4000/api/servicios/${usuarioId}`, {
            servicios: [servicioId]
        }).then((response) => response.data.response);
    }
);
export const editarEstado = createAsyncThunk('editarEstado',async ({ id, body }) => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const nuevoEstado = await Axios.put(`http://200.58.96.142:4000/usuario/estado/${id}`, body, { headers });
        return nuevoEstado.data.response
    }
);
export const borrarUsuario = createAsyncThunk('borrarUsuario', async ({ id }) => {
        const usuarioBorrado = await Axios.delete(`http://200.58.96.142:4000/usuario/${id}`);
        return usuarioBorrado.data.response
    }
);
export const enviarMensajeUsuarios = createAsyncThunk('enviarMensajeUsuarios', async ({mensaje, email})=>{
    try {
        const notificacion = await Axios.post('http://localhost:4000/mensaje/usuarios', { mensaje, email });
        if (notificacion.data.success) {
            return notificacion.data.response;
        } else {
            throw new Error(notificacion.data.error);
        }
    } catch (error) {
        console.error("Error al enviar mensaje:", error);
        throw error;
    }
})
export const setToken = (token) => {
    return {
        type: 'usuario/setToken',
        payload: token
    };
};

const usuarioSlice = createSlice({
    name: 'usuarios',
    initialState,
    reducers: {
        nuevoUsuario: (state, action) => {
            state.usuarios = [...state.usuarios, action.payload];
        },
        register: (state, action) => {
            state.usuario = action.payload;
        }
    },extraReducers: (builder) => {
        /* Registrar Usuario */
        builder.addCase(registrarUsuario.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registrarUsuario.fulfilled, (state, action) => {
            state.loading = false;
            state.usuarios = action.payload;
            state.error = '';
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
            state.error = '';
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
            state.error = '';
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
            state.rol = action.payload.rol;
            state.error = '';
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
            state.error = '';
        });
        builder.addCase(editarUsuario.rejected, (state, action) => {
            state.loading = false;
            state.usuario = {};
            state.error = action.error.message;
        });

        /* Agregar Servicio al Usuario */
        builder.addCase(agregarServicioUsuario.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(agregarServicioUsuario.fulfilled, (state, action) => {
            state.loading = false;
            state.usuario = action.payload;
            state.error = '';
        });
        builder.addCase(agregarServicioUsuario.rejected, (state, action) => {
            state.loading = false;
            state.usuario = {};
            state.error = action.error.message;
        });
        
        /* Editar Estado */
        builder.addCase(editarEstado.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(editarEstado.fulfilled, (state, action) => {
            state.loading = false;
            state.usuario = action.payload;
            state.error = '';
        });
        builder.addCase(editarEstado.rejected, (state, action) => {
            state.loading = false;
            state.usuario = {};
            state.error = action.error.message;
        });

        /* REGISTER */
        builder.addCase(registerActionToolkit.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerActionToolkit.fulfilled, (state, action) => {
            state.loading = false;
            state.usuario = action.payload;
            state.error = '';
        });
        builder.addCase(registerActionToolkit.rejected, (state, action) => {
            state.loading = false;
            state.usuario = {};
            state.error = action.error.message;
        });
        
        /* Borrar */ 
        builder.addCase(borrarUsuario.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(borrarUsuario.fulfilled, (state, action) => {
            state.loading = false;
            state.usuario = action.payload;
            state.error = '';
        });
        builder.addCase(borrarUsuario.rejected, (state, action) => {
            state.loading = false;
            state.usuario = {};
            state.error = action.error.message;
        });

        /* Cerrar Sesion */
        builder.addCase(cerrarSesion.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(cerrarSesion.fulfilled, (state) => {
            state.loading = false;
            state.token = ''; 
            state.error = '';
        });
        builder.addCase(cerrarSesion.rejected, (state, action) => {
            state.loading = false;
            state.token = ''; 
            state.error = action.error.message;
        });

        /* Enviar Mensaje */
        builder.addCase(enviarMensajeUsuarios.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(enviarMensajeUsuarios.fulfilled, (state) => {
            state.loading = false;
            exitoNotificacion('Mensaje enviado con éxito');
        });
        builder.addCase(enviarMensajeUsuarios.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { nuevoUsuario, usuarios } = usuarioSlice.actions;

export default usuarioSlice.reducer


