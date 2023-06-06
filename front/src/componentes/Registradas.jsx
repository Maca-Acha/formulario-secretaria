import '../Registradas.css'
import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { fetchUsuarios } from "../redux/reducers/usuarioSlice"

function Registradas(){
    const dispatch = useDispatch()
    const usuarios = useSelector((state) => state.usuarios.usuarios);

    useEffect(() => {
        dispatch(fetchUsuarios());
    }, [dispatch]);

    return(
        <div className='cont-contenedor-cards'>
            {usuarios? 
            <div className="contenedor-cards">
                {usuarios.map((usuario)=>{
                    return (
                        <div className="card-usuarios" key={usuario._id}>
                            <div className='cont-card-foto'>
                                <div>
                                    <p> {usuario.nombre} </p>
                                    <p> {usuario.apellido} </p>
                                </div>
                                <p className='card-foto'>Foto</p>
                            </div>
                            <p><span className='negrita'>DNI: </span>{usuario.dni} </p>
                            <p><span className='negrita'>CUIL: </span>{usuario.cuil} </p>
                            <p><span className='negrita'>Dirección: </span>{usuario.direccion} </p>
                            <p><span className='negrita'>Celular: </span>{usuario.cel} </p>
                            <p><span className='negrita'>Mail: </span>{usuario.mail} </p>
                            <p><span className='negrita'>Nacimiento: </span>{usuario.nacimiento} </p>
                            <p><span className='negrita'>Nivel de Estudios: </span>{usuario.estudios} </p>
                            <p><span className='negrita'>Genero: </span>{usuario.genero} </p>
                            <p><span className='negrita'>Terea: </span>{usuario.tarea} </p>
                            <p><span className='negrita'>Organización </span>{usuario.organizacion} </p>
                            <p><span className='negrita'>Referente: </span>{usuario.referente} </p>
                            <p><span className='negrita'>Hijos: </span>{usuario.hijos} </p>
                        </div>
                )})}
            </div>
            : <h1>Cargando</h1>}
        </div>
    )
}
export default Registradas