import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    nombre:"",
    apellido:"",
    email:"",
    dni:"",
    cuil:"",
    telefono:"",
    foto:"",
    cv:"",
    direccion:"",
    nacimiento:"",
    genero:"",
    organizacion:"",
    referente:"",
    tarea:"",
    hijos:"",
    token:"",
}

export const userSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        setUser:(state, action) => {
            state.nombre = action.payload.nombre;
            state.apellido = action.payload.apellido;
            state.email = action.payload.email;
            state.dni = action.payload.dni;
            state.cuil = action.payload.cuil;
            state.telefono = action.payload.telefono;
            state.foto = action.payload.foto;
            state.cv = action.payload.cv;
            state.direccion = action.payload.direccion;
            state.nacimiento = action.payload.nacimiento;
            state.genero = action.payload.genero;
            state.organizacion = action.payload.organizacion;
            state.referente = action.payload.referente;
            state.hijos = action.payload.hijos;
        }
    },
    },
)

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer