import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    usuarios:[]
}

export const usuarioSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        addUsuario:(state, action) => {
            state.usuriosList = [...state.usuariosList, action.payload];
        }
    },
    },
)

// Action creators are generated for each case reducer function
export const {  addUsuario } = usuarioSlice.actions

export default usuarioSlice.reducer