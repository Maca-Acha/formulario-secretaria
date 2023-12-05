import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../redux/reducers/rootreducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['usuarios', 'usuario', 'token', 'id', 'error', 'servicios', 'filtro'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
