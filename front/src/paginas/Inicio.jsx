import {Link, useNavigate} from "react-router-dom"
import { fetchUsuarios, signIn, signToken } from "../redux/reducers/usuarioSlice"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Inicio(){
    const dispatch = useDispatch()
    const token = useSelector((state) => state.usuarios.token)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchUsuarios());       
    }, [dispatch]);

    localStorage.getItem("token") &&  !token && dispatch(signToken())

    const dni = useRef()
    const contrasena = useRef()

    function handleSignIn(e) {
        e.preventDefault();
        dispatch(
            signIn({
                dni: dni.current.value,
                contrasena: contrasena.current.value,
            })
            )
            .then((action) => {
                if (action.payload && action.payload.token && action.payload.id) {
                navigate(`/Usuario/${action.payload.id}`, { replace: true });
                }
        }).catch((error) => console.log(error));
        dni.current.value = "";
        contrasena.current.value = "";
    }

    return(
        <div className="cont-btns-inicio">
            <form className="fondo-inicio" onSubmit={handleSignIn}>
                <h2>Iniciar Sesión</h2>
                <input type="text" ref={dni} className="input-inicio" placeholder="DNI" /> 
                <input type="password" ref={contrasena} className="input-inicio" placeholder="Contraseña" /> 
                <button type="submit" className="btn-inicio" >Iniciar sesión</button >
                <Link to="/Registrarse" className="btn-crear-cuenta">Crear cuenta</Link>
            </form>
        </div>
    )
}