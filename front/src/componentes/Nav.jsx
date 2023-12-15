import logo from '../assets/logoFondoBlanco.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { cerrarSesion, signToken} from "../redux/reducers/usuarioSlice"
import { useEffect } from 'react'

export default function Nav(){
    const dispatch = useDispatch()
    const token = useSelector((state) => state.usuario.token);
    const usuario = useSelector((state) => state.usuario);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") && !token) {
            dispatch(signToken());
        }
    }, [dispatch, token]);

    const handleCerrarSesion = async() => {
        dispatch(cerrarSesion());
        navigate('/');
    }

    return(
        <div className='encabezado'>
            <Link to='/' onClick={handleCerrarSesion} className='cont-logo-nav' >
                <img src={logo} className='logo_ministerio' alt='min_desarrollo_social'/>
                <h2 className='title-nav'>Tejiendo Redes que Abrazan</h2>
            </Link>
            {token &&
                <>
                    <Link to={usuario && usuario.rol === "admin" ? "/perfil-admin":`/Usuario/${usuario._id}`} className='nombreLog'>Inicio</Link> 
                </>
            }
        </div>
    )
}