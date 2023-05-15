import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from '../redux/reducers/userSlice'
import  usuariosReducer  from '../redux/reducers/usuarioSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        usuario: usuariosReducer
    },
})