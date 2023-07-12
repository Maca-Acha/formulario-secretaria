import '../Registradas.css'
import { useDispatch, useSelector} from "react-redux"
import { useEffect, useMemo } from "react"
import {Link, useParams} from "react-router-dom"
import { traerUsuario} from "../redux/reducers/usuarioSlice"
import Pdf from './pdf'
import Servicios from './Servicios'

export default function AdminUsuario(){
    const dispatch = useDispatch()
    const params = useParams()
    const memoizedId = useMemo(() => params.id, [params.id]);
    const usuario = useSelector((state) => state.usuario.usuario); 

    useEffect(() => {
        if (memoizedId) {
            dispatch(traerUsuario(memoizedId));
        }
    }, [dispatch, memoizedId]);

    return(
        <div className='cont-admin-servicios'>
            <div className='contenedor-usuario contenedor-usuario-admin'>
                {usuario &&
                    <div className='card-usuarios usuario-cont-admin' key={usuario._id}>
                        <div className='cont-card-foto'>
                            <div className='cont-titulo'>
                                <p className='titulo'> {usuario.nombre} </p>
                                <p className='titulo'> {usuario.apellido} </p>
                            </div> 
                            <p className='card-foto'>Foto</p>
                        </div>
                        <div className='informacion'>
                            <section className='input-perfil'>
                                <p className='negrita'>DNI: </p>
                                <p className='texto-info'>{usuario.dni}</p>
                            </section>
                            <section className='input-perfil'>
                                <p className='negrita'>CUIL: </p>
                                <p className='texto-info'>{usuario.cuil} </p>
                            </section>
                            <section className='input-perfil'>
                                <p className='negrita'>Dirección: </p>
                                <p className='texto-info'>{usuario.direccion} </p>
                            </section >
                            <section className='input-perfil'>
                                <p className='negrita'>Celular: </p>
                                <p className='texto-info'>{usuario.cel}</p>
                            </section >
                            <section className='input-perfil'>
                                <p className='negrita'>Mail: </p>
                                <p className='texto-info'>{usuario.mail}</p>
                            </section>
                            <section className='input-perfil'>
                                <p className='negrita'>Nacimiento: </p>
                                <p className='texto-info'>{usuario.nacimiento} </p>
                            </section>
                            <section className='input-perfil'>
                                <p className='negrita '>Nivel de Estudios: </p>
                                <p className='texto-info'>{usuario.estudios}</p>
                            </section>
                            <section className='input-perfil'>
                                <p className='negrita'>Genero: </p>
                                <p className='texto-info'>{usuario.genero}</p> 
                            </section>
                            <section className='input-perfil'>
                                <p className='negrita'>Terea: </p>
                                <p className='texto-info'>{usuario.tarea}</p>
                            </section>
                            <p>
                                <span className='negrita'>Organización </span>
                                <span className='texto-info'>{usuario.organizacion}</span> 
                            </p>
                            <p>
                                <span className='negrita'>Referente: </span>
                                <span></span>{usuario.referente} 
                            </p>
                            <section className='input-perfil'>
                                <span className='negrita'>Hijos: </span>
                                <span className='texto-info'>{usuario.hijos}</span>
                            </section>
                        </div>
                        <div>
                            <Link to={Pdf} target='_blanck'>Ver CV</Link>
                        </div>
                    </div>
                } 
            </div>
            <Servicios />
        </div>
    )
}