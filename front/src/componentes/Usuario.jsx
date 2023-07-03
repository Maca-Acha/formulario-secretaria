import '../Registradas.css'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from 'react';
import {Link} from "react-router-dom"
import { traerUsuario, editarUsuario } from "../redux/reducers/usuarioSlice"
import {Estudios, Generos} from "./Constantes"
import Pdf from './pdf'
import {FiEdit} from "react-icons/fi";

export default function Usuario(){
    const dispatch = useDispatch()
    const usuario = useSelector((state) => state.usuario);
    const id = useSelector((state) => state.id);

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
/*  const cv = useRef()
    const foto = useRef() */
    const estudios = useRef()
    const tareas = useRef()
/*     const organizacion = useRef()
    const referente = useRef() */
    const hijos = useRef()
    const genero= useRef()
    const contrasena = useRef()

    useEffect(() => {
        id && dispatch(traerUsuario(id));
    }, [dispatch, id]);

    function handleEditarUsuario(e) {
        e.preventDefault()
        console.log(nombre.current.value)
        dispatch(editarUsuario({
            id: id, 
            body: {
                apellido: apellido.current.value,
                nombre: nombre.current.value,
                /* dni: dni.current.value,
                cuil: cuil.current.value,
                direccion: domicilio.current.value,
                cel: telefono.current.value,
                mail: mail.current.value,
                nacimiento: fecha.current.value,
                estudios: estudios.current.value, */
                /* genero: generoSeleccionado, */
                /* tarea: tareas.current.value,
                organizacion: organizacion.current.value,
                referente: referente.current.value,
                hijos: hijos.current.value,
                contrasena: contrasena.current.value */
            }
        }));
            
    }

    return(
        <div className='contenedor-usuario'>
            {usuario &&
                <div className='card-usuarios usuario-cont' key={usuario._id}>
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
                                        
                                        className="input-editor"
                                        type="submit"
                                        value='enviar'
                                    />
                                    <input
                                        ref={apellido}
                                        className="input-editor"
                                        type="text"
                                        defaultValue={usuario.apellido}
                                    />
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
                                        defaultValue={usuario.domicilio}
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
                                        defaultValue={usuario.telefono}
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
                                        defaultValue={usuario.fecha}
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
        </div>
    )
}