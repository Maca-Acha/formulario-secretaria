import { Routes, Route } from 'react-router-dom';
import Registrarse from './ContRegistro';
import Usuario from './Usuario';
import Inicio from '../paginas/Inicio';

function RoutesManager (){
    return(
        <Routes>
            <Route path= "/"  element= {<Inicio />} />
            <Route path= "/Registrarse"  element= {<Registrarse />} />
            <Route path= "/Usuario/:id"  element= {<Usuario />} />
        </Routes>
    )
}
export default RoutesManager