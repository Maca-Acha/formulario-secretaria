import {Link} from "react-router-dom"

export default function Inicio(){
    return(
        <div className="cont-btns-inicio">
            <div className="fondo-inicio">
                <h2>Iniciar Sesión</h2>
                <input type="text" className="input-inicio" placeholder="Nombre de Cuenta" /> 
                <input type="text" className="input-inicio" placeholder="Contrasena" /> 
                <Link className="btn-inicio" >Iniciar sesión</Link>
                <Link to="/Registrarse" className="btn-crear-cuenta">Crear cuenta</Link>
            </div>
            
        </div>
    )
}