import logo from '../assets/min_desarrollo_social.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { signToken} from "../redux/reducers/usuarioSlice"
import { useEffect } from 'react'

export default function Nav(){
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token);
    const usuario = useSelector((state) => state.usuario.usuario);

    useEffect(() => {
        if (localStorage.getItem("token") && !token) {
            dispatch(signToken());
        }
    }, [dispatch, token, usuario]);

    return(
        <div className='encabezado'>
            <Link to="/" >
                <img src={logo} className='logo_ministerio' alt='min_desarrollo_social'/>
            </Link>
            {usuario &&
            <h2 className='nombreLog'>{usuario.nombre} {usuario.apellido}</h2> 
            }
        </div>
    )
}