import '../Registradas.css'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from 'react';
import {Link, useParams} from "react-router-dom"
import { traerUsuario, editarUsuario } from "../redux/reducers/usuarioSlice"
import { traerServicios } from "../redux/reducers/serviciosSlice"
import {Estudios, Generos} from "./Constantes"
import Pdf from './pdf'
import {FiEdit} from "react-icons/fi";

export default function Usuario(){
    const dispatch = useDispatch()
    const params = useParams()
    const usuario = useSelector((state) => state.usuario.usuario);
    const servicios = useSelector((state) => state.servicios.servicios);
    const id = useSelector((state) => state.usuario.id);

    const editar = <FiEdit />
    const [editNombre, setEditNombre] = useState(false)
    const [editDni, setEditDni] = useState(false)
    const [editCuil, setEditCuil] = useState(false)
    const [editFecha, setEditFecha] = useState(false)
    const [editDomicilio, setEditDomicilio] = useState(false)
    const [editTel, setEditTel] = useState(false)
    const [editMail, setEditMail] = useState(false)
    const [editEstudios, setEditEstudios] = useState(false)
    const [editGenero, setEditGenero] = useState(false)
    const [editTareas, setEditTareas] = useState(false)
    const [editHijos, setEditHijos] = useState(false)
    const [editContrasena, setEditContrasena] = useState(false)
    
    const apellido = useRef()
    const nombre = useRef()
    const dni = useRef()
    const cuil = useRef()
    const fecha = useRef()
    const domicilio = useRef()
    const telefono = useRef()
    const mail = useRef()
    /* const cv = useRef()
    const foto = useRef() */
    const estudios = useRef()
    const tareas = useRef()
    const organizacion = useRef()
    const referente = useRef()
    const hijos = useRef()
    const genero= useRef()
    const contrasena = useRef()

    useEffect(() => {
        id && dispatch(traerUsuario(id));
        if (params) {
            dispatch(traerServicios(params.id));
        }
    }, [dispatch, id, params]);

    function handleEditarUsuario(e) {
        e.preventDefault()
        dispatch(editarUsuario({
            id: id, 
            body: {
                apellido: apellido.current?.value,
                nombre: nombre.current?.value,
                dni: dni.current?.value,
                cuil: cuil.current?.value,
                direccion: domicilio.current?.value,
                cel: telefono.current?.value,
                mail: mail.current?.value,
                nacimiento: fecha.current?.value,
                estudios: estudios.current?.value,
                /* genero: generoSeleccionado, */
                tarea: tareas.current?.value,
                organizacion: organizacion.current?.value,
                referente: referente.current?.value,
                hijos: hijos.current?.value,
                contrasena: contrasena.current?.value
            }
        })); 
        editNombre && setEditNombre(!editNombre)
        editDni && setEditDni(!editDni)
        editCuil && setEditCuil(!editCuil)
        editFecha && setEditFecha(!editFecha)
        editDomicilio && setEditDomicilio(!editDomicilio)
        editTel && setEditTel(!editTel)
        editMail && setEditMail(!editMail)
        editEstudios && setEditEstudios(!editEstudios)
        editGenero && setEditGenero(!editGenero)
        editTareas && setEditTareas(!editTareas)
        editHijos && setEditHijos(!editHijos)
        editContrasena && setEditContrasena(!editContrasena)
    }
    usuario && console.log(usuario) 
    return(
        <div className='contenedor-usuario'>
            {usuario &&
                <div className='card-usuarios usuario-cont' >
                    <div className='cont-card-foto'>
                        <div className='cont-titulo'>
                            <p className='titulo'> {usuario.nombre} </p>
                            <p className='titulo'> {usuario.apellido} </p>
                            <div className="btn-cursor btn-edit"  onClick={() => {setEditNombre(!editNombre)}}>{editar} </div>
                            {editNombre && (
                                <form className="editor" onSubmit={handleEditarUsuario}>
                                    <input
                                        ref={nombre}
                                        className="input-editor"
                                        type="text"
                                        defaultValue={usuario.nombre}
                                    />
                                    <input
                                        ref={apellido}
                                        className="input-editor"
                                        type="text"
                                        defaultValue={usuario.apellido}
                                    />
                                    <input />
                                </form>
                            )}
                        </div> 
                        <p className='card-foto'>Foto</p>
                    </div>
                    <div className='informacion'>
                        <section className='input-perfil'>
                            <p className='negrita'>DNI: </p>
                            {editDni ? (
                                <form className="editor" onSubmit={handleEditarUsuario}>
                                    <input
                                        ref={dni}
                                        className='input-editor'
                                        type="text"
                                        defaultValue={usuario.dni}
                                    />
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
                            ):<p className='texto-info'>{usuario.cuil} </p>
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
                            ):<p className='texto-info'>{usuario.direccion} </p>}
                            <div className="btn-cursor btn-edit"  onClick={() => {setEditDomicilio(!editDomicilio)}}>{editar} </div>
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
                            ):<p className='texto-info'>{usuario.cel}</p>}
                            <div className="btn-cursor btn-edit"  onClick={() => {setEditTel(!editTel)}}>{editar} </div>
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
                            {editEstudios ? (
                                <form className="editor" onSubmit={handleEditarUsuario}>
                                    <select ref={estudios}>
                                        <option disabled="disabled">Seleccione una opcion</option>
                                        {Estudios.map((estudio, index)=>{
                                            return (
                                            <option value={estudio} key={index}>{estudio}</option>
                                        )})}
                                    </select>
                                </form>
                            ):<p className='texto-info'>{usuario.estudios}</p>}
                            <div className="btn-cursor btn-edit"  onClick={() => {setEditEstudios(!editEstudios)}}>{editar} </div>
                        </section>
                        <section className='input-perfil'>
                            <p className='negrita'>Genero: </p>
                            <p className='texto-info'>{usuario.genero}</p> 
                            {editGenero ? (
                                <form className="editor" onSubmit={handleEditarUsuario}>
                                    <select ref={genero}>
                                        <option disabled="disabled">Seleccione una opcion</option>
                                        {Generos.map((genero, index)=>{
                                            return (
                                            <option value={genero} key={index}>{genero}</option>
                                        )})}
                                    </select>
                                </form>
                            ):<p className='texto-info'>{usuario.genero}</p>}
                            <div className="btn-cursor btn-edit"  onClick={() => {setEditGenero(!editGenero)}}>{editar} </div>
                        </section>
                        <section className='input-perfil'>
                            <p className='negrita'>Terea: </p>
                            {editTareas ? (
                                <form className="editor" onSubmit={handleEditarUsuario}>
                                    <input
                                        ref={tareas}
                                        className='input-editor'
                                        type="text"
                                        defaultValue={usuario.tarea}
                                    />
                                </form>
                            ):<p className='texto-info'>{usuario.tarea}</p>}
                            <div className="btn-cursor btn-edit"  onClick={() => {setEditTareas(!editTareas)}}>{editar} </div>
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
                            {editHijos ? (
                                <form className="editor" onSubmit={handleEditarUsuario}>
                                    <input
                                        ref={hijos}
                                        className='input-editor'
                                        type="text"
                                        defaultValue={usuario.hijos}
                                    />
                                </form>
                            ):<span className='texto-info'>{usuario.hijos}</span>}
                            <div className="btn-cursor btn-edit"  onClick={() => {setEditHijos(!editHijos)}}>{editar} </div>
                        </section>
                    </div>
                    <div>
                        <Link to={Pdf} target='_blanck'>Ver CV</Link>
                    </div>
                    {editContrasena && (
                        <form className="editor" onSubmit={handleEditarUsuario}>
                            <input
                                ref={contrasena}
                                className='input-editor'
                                type="text"
                                placeholder="Ingrese contraseña nueva"
                            />
                        </form>
                    )}
                    <Link className="btn-cursor btn-edit"  onClick={() => {setEditContrasena(!editContrasena)}}>Cambiar contraseña </Link>
                </div>
            }
            <div className='contenedor-usuario contenedor-usuario-admin serv-usuario'>
                <div className='card-servicios usuario-cont-admin' >
                    <div className='cont-servicios'>
                        <div className='cont-servicio'>
                            <p className='titulo negrita titulo-servicios'>Servicios Adquiridos</p>
                            {servicios ? 
                            servicios.map((servicio, index) => 
                                <div key={index} className="cont-serv-linea">
                                    <p >{servicio.descripcion}</p>
                                    <div className="linea"></div>
                                </div>
                            ):
                            <p>Cargando</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 
