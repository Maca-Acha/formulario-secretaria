import { combineReducers } from 'redux';
import usuarioReducer from './usuarioSlice';
import serviciosReducer from './serviciosSlice';

const rootReducer = combineReducers({
  usuario: usuarioReducer,
  servicios: serviciosReducer,
});

export default rootReducer;
