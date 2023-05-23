import { configureStore } from '@reduxjs/toolkit'
import  usuariosReducer  from '../redux/reducers/usuarioSlice'


export const store = configureStore({
    reducer: {
        usuarios: usuariosReducer
    },
})