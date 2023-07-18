import { combineReducers } from 'redux';
import usuarioReducer from './usuarioSlice';
import serviciosReducer from './serviciosSlice';
import filtroReducer from './filtroSlice';

const rootReducer = combineReducers({
  usuario: usuarioReducer,
  servicios: serviciosReducer,
  filtro: filtroReducer,
});

export default rootReducer;
