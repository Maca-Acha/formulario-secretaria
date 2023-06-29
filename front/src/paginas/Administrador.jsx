import {Link} from "react-router-dom"

export default function Administrador(){
    return(
        <div className="cont-btns-inicio">
            <form className="fondo-inicio" >
                <h2>Iniciar Sesión</h2>
                <h5>como administrador</h5>
                <input type="text"  className="input-inicio" placeholder="DNI" /> 
                <input type="password"  className="input-inicio" placeholder="Contraseña" /> 
                <Link to="/Registradas" className="btn-inicio" >Iniciar sesión</Link >
                
            </form>
        </div>
    )
}