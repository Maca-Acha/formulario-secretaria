import {Link, useNavigate} from "react-router-dom"
import { fetchUsuarios, signIn, signToken, setToken,   } from "../redux/reducers/usuarioSlice"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Inicio(){
    const ojo = <AiFillEye/>
    const ojoCerrado = <AiFillEyeInvisible/>
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token);
    const usuario = useSelector((state) => state.usuario.usuario);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

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
                toast.success('Bienvenido/a ' + usuario.nombre , {
                    position: toast.POSITION.TOP_RIGHT
                });
                navigate(`/Usuario/${action.payload.id}`, { replace: true });
            }
        })        
        .catch((error) => console.log(error));
        dni.current.value = "";
        contrasena.current.value = "";
    }

    return(
        <div className="cont-btns-inicio">
            <form className="fondo-inicio" onSubmit={handleSignIn}>
                <h2>Iniciar Sesión</h2>
                <input type="text" ref={dni} className="input-inicio" placeholder="DNI" /> 
                <div className="input-inicio ver-contrasena"> 
                    <input
                        type={showPassword ? 'text' : 'password'} 
                        ref={contrasena}
                        placeholder="Contraseña"
                    />
                    <div className="ojo" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? ojoCerrado : ojo} 
                    </div>
                </div>
                <button type="submit" className="btn-inicio" >Iniciar sesión</button >
                <Link to="/Registrarse" className="btn-crear-cuenta">Crear cuenta</Link>
                <Link to="/Administrador">Soy Administrador</Link>
            </form>
        </div>
    )
}