import '../Registradas.css'
import { useDispatch, useSelector} from "react-redux"
import { useEffect, useMemo, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { traerUsuario, editarUsuario } from "../redux/reducers/usuarioSlice"
import Servicios from './Servicios'
import { MdDownload } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

export default function AdminUsuario(){
    const dispatch = useDispatch()
    const params = useParams()
    const memoizedId = useMemo(() => params.id, [params.id]);
    const usuario = useSelector((state) => state.usuario.usuario); 
    const servicios = useSelector((state) => state.servicios.servicios); 
    
    const descargar = <MdDownload/>
    const editar = <FiEdit />
    const notificacion = () => toast("No tiene servicios adquiridos");

    useEffect(() => {
        if (memoizedId) {
            dispatch(traerUsuario(memoizedId));
        }
    }, [dispatch, memoizedId]);

    //Exportar
    const handleExportUsuarios = () => {
        const data = servicios.map((servicio)=>({
            Servicios: servicio.descripcion,
            Fecha: servicio.fecha
        }))

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
        XLSX.writeFile(wb, `Servicios-${usuario.nombre}-${usuario.apellido}.xlsx`);
    };

    //Editar Usuario
    const [editDni, setEditDni] = useState(false)
    const [editCuil, setEditCuil] = useState(false)
    const [editFecha, setEditFecha] = useState(false)
    const [editDomicilio, setEditDomicilio] = useState(false)
    const [editTel, setEditTel] = useState(false)
    const [editMail, setEditMail] = useState(false)
    const [editActividad, setEditActividad] = useState(false)
    
    const dni = useRef()
    const cuil = useRef()
    const fecha = useRef()
    const domicilio = useRef()
    const telefono = useRef()
    const mail = useRef()
    const actividad = useRef()


    function handleEditarUsuario(e) {
        e.preventDefault()
        dispatch(editarUsuario({
            id: memoizedId, 
            body: {
                dni: dni.current?.value,
                cuil: cuil.current?.value,
                direccion: domicilio.current?.value,
                cel: telefono.current?.value,
                mail: mail.current?.value,
                nacimiento: fecha.current?.value,
                actividad: actividad.current?.value,
            }
        })); 
        editDni && setEditDni(!editDni)
        editCuil && setEditCuil(!editCuil)
        editFecha && setEditFecha(!editFecha)
        editDomicilio && setEditDomicilio(!editDomicilio)
        editTel && setEditTel(!editTel)
        editMail && setEditMail(!editMail)
        editActividad && setEditActividad(!editActividad)
    }
    
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
                        </div>
                        <div className='informacion'>
                            <section className='input-perfil'>
                                <p className='negrita'>DNI: </p>
                                {editDni ? (
                                    <form className='editor' onSubmit={handleEditarUsuario}>
                                        <input ref={dni} defaultValue={usuario.dni}/>
                                    </form>
                                    ):<p className='texto-info'>{usuario.dni}</p>
                                }
                                <div className="btn-cursor btn-edit"  onClick={() => {setEditDni(!editDni)}}>{editar} </div>
                            </section>
                            <section className='input-perfil'>
                                <p className='negrita'>CUIL: </p>
                                {editCuil ? (
                                    <form className="editor" onSubmit={handleEditarUsuario}>
                                        <input
                                            ref={cuil}
                                            className='input-editor'
                                            type="text"
                                            defaultValue={usuario.cuil}
                                        />
                                    </form>
                                    ): <p className='texto-info'>{usuario.cuil} </p>
                                }<div className="btn-cursor btn-edit"  onClick={() => {setEditCuil(!editCuil)}}>{editar} </div>
                            </section>
                            <section className='input-perfil'>
                                <p className='negrita'>Dirección: </p>
                                {editDomicilio ? (
                                    <form className="editor" onSubmit={handleEditarUsuario}>
                                        <input
                                            ref={domicilio}
                                            className='input-editor'
                                            type="text"
                                            defaultValue={usuario.direccion}
                                        />
                                    </form>
                                ):<p className='texto-info'>{usuario.direccion} </p>
                                }<div className="btn-cursor btn-edit"  onClick={() => {setEditDomicilio(!editDomicilio)}}>{editar} </div>
                            </section >
                            <section className='input-perfil'>
                                <p className='negrita'>Celular: </p>
                                {editTel ? (
                                    <form className="editor" onSubmit={handleEditarUsuario}>
                                        <input
                                            ref={telefono}
                                            className='input-editor'
                                            type="text"
                                            defaultValue={usuario.cel}
                                        />
                                    </form>
                                ):<p className='texto-info'>{usuario.cel}</p>
                                }<div className="btn-cursor btn-edit"  onClick={() => {setEditTel(!editTel)}}>{editar} </div>
                            </section >
                            <section className='input-perfil'>
                                <p className='negrita'>Mail: </p>
                                {editMail ? (
                                    <form className="editor" onSubmit={handleEditarUsuario}>
                                        <input
                                            ref={mail}
                                            className='input-editor'
                                            type="text"
                                            defaultValue={usuario.mail}
                                        />
                                    </form>
                                ):<p className='texto-info'>{usuario.mail}</p> 
                                }
                                <div className="btn-cursor btn-edit"  onClick={() => {setEditMail(!editMail)}}>{editar} </div>
                            </section>
                            <section className='input-perfil'>
                                <p className='negrita'>Nacimiento: </p>
                                {editFecha ? (
                                    <form className="editor" onSubmit={handleEditarUsuario}>
                                        <input
                                            ref={fecha}
                                            className='input-editor'
                                            type="date"
                                            defaultValue={usuario.nacimiento}
                                        />
                                    </form>
                                ):<p className='texto-info'>{usuario.nacimiento} </p>}
                                <div className="btn-cursor btn-edit"  onClick={() => {setEditFecha(!editFecha)}}>{editar} </div>
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
                                <p className='negrita'>Actividad: </p>
                                {editActividad ? (
                                <form className="editor" onSubmit={handleEditarUsuario}>
                                    <input
                                        ref={actividad}
                                        className='input-editor'
                                        type="text"
                                        defaultValue={usuario.tarea}
                                    />
                                </form>
                            ):<p className='texto-info'>{usuario.tarea}</p>}
                            <div className="btn-cursor btn-edit"  onClick={() => {setEditActividad(!editActividad)}}>{editar} </div>
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
                        {/* <div>
                            <Link to={Pdf} target='_blanck'>Ver CV</Link>
                        </div> */}
                    </div>
                } 
            </div>
            <div className='cont-servicios'>
                <Servicios />
                <button className='btn-exportar' onClick={servicios.length ? handleExportUsuarios: notificacion}>Exportar servicios del usuario {descargar}</button>
            </div>
        </div>
    )
}