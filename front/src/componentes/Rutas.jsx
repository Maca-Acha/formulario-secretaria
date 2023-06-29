import { Routes, Route } from 'react-router-dom';
import Registrarse from './ContRegistro';
import Registrardas from './Registradas';
import Usuario from './Usuario';
import Inicio from '../paginas/Inicio';
import Administrador from '../paginas/Administrador';

function RoutesManager (){
    return(
        <Routes>
            <Route path= "/"  element= {<Inicio />} />
            <Route path= "/Registrarse"  element= {<Registrarse />} />
            <Route path= "/Registradas"  element= {<Registrardas />} />
            <Route path= "/Administrador"  element= {<Administrador />} />
            <Route path= "/Usuario/:id"  element= {<Usuario />} />
        </Routes>
    )
}
export default RoutesManager