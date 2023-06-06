import { Routes, Route } from 'react-router-dom';
import Registrarse from './ContRegistro';
import Registradas from './Registradas';

function RoutesManager (){
    return(
        <Routes>
            <Route path= "/"  element= {<Registrarse />} />
            <Route path= "/Registradas"  element= {<Registradas />} />
        </Routes>
    )
}
export default RoutesManager