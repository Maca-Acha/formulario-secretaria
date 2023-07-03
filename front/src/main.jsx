import React from 'react'
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from './app/configureStore.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

/* 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import usuariosReducer from './redux/reducers/usuarioSlice';

const localStorageKey = 'reduxState';

// Cargar el estado desde el localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem(localStorageKey);
    if (serializedState === null) {
      return undefined;
    }
    // Asegúrate de manejar errores al analizar la cadena JSON
    return JSON.parse(serializedState);
  } catch (error) {
    console.log('Error al cargar el estado desde el localStorage:', error);
    return undefined;
  }
};

// Guardar el estado en el localStorage
const saveState = (state) => {
  try {
    // Asegúrate de manejar errores al convertir el estado a una cadena JSON
    const serializedState = JSON.stringify(state);
    localStorage.setItem(localStorageKey, serializedState);
  } catch (error) {
    console.log('Error al guardar el estado en el localStorage:', error);
  }
};


// Cargar el estado inicial
const initialState = loadState();

// Crear el store de Redux con el estado inicial
const store = configureStore({
  reducer: { usuarios: usuariosReducer },
  preloadedState: initialState,
});

// Suscribirse al evento 'beforeunload' para guardar el estado antes de recargar o cerrar la página
window.addEventListener('beforeunload', () => {
  saveState(store.getState());
});

// Renderizar la aplicación
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
); */
