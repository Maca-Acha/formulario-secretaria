import { configureStore } from '@reduxjs/toolkit'
import  usuariosReducer  from '../redux/reducers/usuarioSlice'

export const store = configureStore({
    reducer: {
        usuarios: usuariosReducer
    },
})
/* 
import { configureStore } from '@reduxjs/toolkit';
import usuariosReducer from '../redux/reducers/usuarioSlice';

const localStorageKey = 'reduxState';

// Cargar el estado desde el localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem(localStorageKey);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

// Guardar el estado en el localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(localStorageKey, serializedState);
  } catch (error) {
    // Manejar el error en caso de que no se pueda guardar el estado
  }
};

// Cargar el estado inicial
const initialState = loadState();

// Crear el store de Redux con el estado inicial
export const store = configureStore({
  reducer: { usuarios: usuariosReducer },
  preloadedState: initialState,
});

// Suscribirse al evento 'beforeunload' para guardar el estado antes de recargar o cerrar la página
window.addEventListener('beforeunload', () => {
  saveState(store.getState());
});

export default store;
 */