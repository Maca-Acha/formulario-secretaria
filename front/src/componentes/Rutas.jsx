import { Routes, Route } from 'react-router-dom';
import Registrarse from './ContRegistro';
import Registrardas from './Registradas';
import Usuario from './Usuario';
import Inicio from '../paginas/Inicio';
import Administrador from '../paginas/Administrador';
import AdminUsuario from './AdminUsuario';
import PerfilAdmin from '../paginas/PerfilAdmin';
import RegistrarAdmin from './RegistrarAdmin';

function RoutesManager (){
    
    return(
        <Routes>
            <Route path= "/"  element= {<Inicio />} />
            <Route path= "/Registrarse"  element= {<Registrarse />} />
            <Route path= "/Registradas"  element= {<Registrardas />} />
            <Route path= "/Administrador"  element= {<Administrador />} />
            <Route path= "/Perfil-Admin"  element= {<PerfilAdmin />} />
            <Route path= "/AgregarAdmin"  element= {<RegistrarAdmin />} />
            <Route path= "/adminUsuario/:id"  element= {<AdminUsuario />} />
            <Route path= "/Usuario/:id"  element= {<Usuario />} />
        </Routes>
    )
}
export default RoutesManager