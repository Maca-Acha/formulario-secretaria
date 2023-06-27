import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { traerUsuario } from "../redux/reducers/usuarioSlice"

export default function Usuario(){

    const dispatch = useDispatch()
    const usuario = useSelector((state) => state.usuarios.usuario);
    const id = useSelector((state) => state.usuarios.id);

    useEffect(() => {
        if (id) {
            dispatch(traerUsuario(id));
        }
    }, [dispatch, id]);


    return(
        <div>
            {usuario &&<h1>{usuario.nombre}</h1>}
        </div>
    )
}