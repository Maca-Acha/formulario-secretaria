import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { fetchUsuarios, signToken, signIn, setToken } from "../redux/reducers/usuarioSlice"
import {useNavigate} from "react-router-dom"

export default function Administrador(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector((state) => state.usuario.token);
    const rol = useSelector((state) => state.usuario.rol);

    useEffect(() => {
        dispatch(fetchUsuarios());
        if (localStorage.getItem("token") && !token) {
            dispatch(signToken());
        }
    }, [dispatch, token]);
    
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
            if (action.payload?.token && action.payload?.id) {
                dispatch(setToken(action.payload.token));
                navigate(`${rol && rol === "admin" ? "/Registradas": "/Administrador"}`)
            }
        })        
        .catch((error) => console.log(error));
        dni.current.value = "";
        contrasena.current.value = "";
    }

    return(
        <div className="cont-btns-inicio">
            <form className="fondo-inicio" >
                <h2>Iniciar Sesión</h2>
                <h5>como administrador</h5>
                <input ref={dni} type="text" className="input-inicio" placeholder="DNI" />
                <input ref={contrasena} type="password" className="input-inicio" placeholder="Contraseña" />
                <button className="btn-inicio"  onClick={handleSignIn}>Iniciar sesión</button> 
            </form>
        </div>
    )
}