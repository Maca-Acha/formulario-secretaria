import { Routes, Route } from 'react-router-dom';
import Registrarse from './ContRegistro';
import Registradas from './Registradas';
import Inicio from '../paginas/inicio';

function RoutesManager (){
    return(
        <Routes>
            <Route path= "/"  element= {<Inicio />} />
            <Route path= "/Registrarse"  element= {<Registrarse />} />
            <Route path= "/Registradas"  element= {<Registradas />} />
        </Routes>
    )
}
export default RoutesManager