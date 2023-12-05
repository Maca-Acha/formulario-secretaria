
import '../Registradas.css';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useRef, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsuarios, borrarUsuario, editarEstado, enviarMensajeUsuarios } from "../redux/reducers/usuarioSlice";
import { filtroUsuarios } from "../redux/reducers/filtroSlice";
import { AiFillPlusCircle } from 'react-icons/ai';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdDownload } from "react-icons/md";
import { Organizaciones, Referentes, Actividad } from "./Constantes";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Registradas() {
    const dispatch = useDispatch();
    
    const usuarios = useSelector((state) => state.usuario.usuarios) || [];
    const usuariosMemo = useMemo(() => usuarios, [usuarios]);

    const filtro = useSelector((state) => state.filtro.filtro) || '';
    const agregar = <AiFillPlusCircle className='agregar' />;
    const eliminar = <RiDeleteBin5Fill />;
    const descargar = <MdDownload />;

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchUsuarios());
        };
        fetchData();
    }, [dispatch, usuariosMemo]);

    const organizacion = useRef();
    const referente = useRef();
    const actividad = useRef();
    const estado = useRef();
    const servicio = useRef();
    const txtMensaje = useRef()

    //Filtro
    const [usuariosFiltrados, setusuariosFiltrados] = useState([]);

    useEffect(() => {
        if (filtro && filtro.length === 0) {
            setusuariosFiltrados(usuarios);
        } else {
            setusuariosFiltrados(filtro);
        }
    }, [filtro, usuarios]);

    const [filtros, setFiltros] = useState({
        buscador: "",
        referente: "",
        organizacion: "",
        servicio: "",
        estado: ""
    });

    const filtrarUsuarios = () => {
        dispatch(filtroUsuarios(filtros));
    };
    
    //Exportar
    const handleExportUsuarios = () => {
        try{const data = usuariosFiltrados.map((usuario) => ({
                Apellido: usuario.apellido,
                Nombre: usuario.nombre,
                DNI: usuario.dni,
                CUIL: usuario.cuil,
                Nacimiento: usuario.nacimiento,
                Direccion: usuario.direccion,
                Telefono: usuario.cel,
                Mail: usuario.mail,
                Estudios: usuario.estudios,
                Genero: usuario.genero,
                Actividad: usuario.tarea,
                Organizacion: usuario.organizacion,
                Referente: usuario.referente,
                Estado: usuario.estado,
                Servicios: usuario.servicios.map((servicio) => servicio.descripcion).join(', ')
            }));
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
            XLSX.writeFile(wb, 'usuarios.xlsx');}
        catch (error) {
            console.error("Error al exportar usuarios:", error);
            
        }        
    };
    
    //Enviar Mensaje
    const enviarMensaje = () =>{
        try{
            const email = usuariosFiltrados && usuariosFiltrados.map((usuario) => ({
                email: usuario.mail
            }));
            const mensaje = txtMensaje.current.value
            dispatch(enviarMensajeUsuarios({
                mensaje: mensaje, 
                email: email}))
        }catch(error){
            console.error("Error al enviar mensaje:", error)
        }
    }

    //Editar estado
    async function handleEditarEstado(e, id) {
        const nuevoEstado = e.target.value;
        await dispatch(editarEstado({ id, body: { estado: nuevoEstado } }));
        dispatch(filtroUsuarios(filtros));
    }

    //Borrar
    const handleBorrar = (id)=>{
        Swal.fire({
            title: '¿Seguro de que deseas borrar al usuario/a?',
            text: '¡Este cambio no se puede revertir!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#37BBED',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar usuario/a'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(borrarUsuario({id})
                ).then(() => {
                    dispatch(fetchUsuarios());
                    Swal.fire('¡Borrado!', 'Este usuario/a fue eliminado', 'success');
                });
            }
        });
    }

    //Modals
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='cont-contenedor-cards' >
            <div className='cont-buscador' >
                <form className='cont-filtros-buscar' onSubmit={(e) =>{ e.preventDefault(), filtrarUsuarios()}}>
                    {/* <label className='text-filtrar'>Filtro</label> */}
                    <div className='buscador'>
                        <div className='cont-selects'>
                            <div className='cont-filtros-select'>
                                <input
                                    className='input-buscar input-form'
                                    type='text'
                                    placeholder='Buscar'
                                    value={filtros.buscador}
                                    onChange={(e) => setFiltros({ ...filtros, buscador: e.target.value })}
                                />
                                <select className='input-form' ref={actividad} onChange={(e) => setFiltros({ ...filtros, actividad: e.target.value })}>
                                    {Actividad.map((actividad, index)=>{
                                        return (
                                        <option value={actividad.value} key={index}>{actividad.text}</option>
                                    )})}
                                </select>
                                <select className='input-form' ref={organizacion} onChange={(e) => setFiltros({ ...filtros, organizacion: e.target.value })}>
                                    {Organizaciones.map((orga, index)=>{
                                        return (
                                        <option  value={orga.value} key={index}>{orga.text}</option>
                                    )})}
                                </select>
                            </div>
                            <div className='cont-filtros-select'>
                                <select className='input-form input-select-buscador' ref={referente} onChange={(e) => setFiltros({ ...filtros, referente: e.target.value })}>
                                    {Referentes.map((referente, index)=>{
                                        return (
                                        <option value={referente.value} key={index}>{referente.text}</option>
                                    )})}
                                </select>
                                <select
                                    className="input-form input-select-buscador"
                                    ref={estado}
                                    onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                                    >
                                    <option value="">Todos los estados</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                    <option value="Baja">Baja</option>
                                    <option value="Pendiente">Pendiente</option>
                                </select>
                                <select className="input-form input-select-buscador" ref={servicio} onChange={(e) => setFiltros({ ...filtros, servicio: e.target.value })}>
                                    <option value="">Todos los servicios</option>
                                    {usuarios.map((usuario) => (
                                        usuario.servicios.map((servicio) => (
                                        <option key={servicio._id} value={servicio._id}>
                                            {servicio.descripcion}
                                        </option>
                                        ))
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='cont-btn-buscar'>
                            <input type='submit' className='btnBuscar' value='Buscar' />
                        </div>
                    </div>
                </form>
                <div className='cont-exportar'>
                    <Button variant="primary" onClick={handleShow}>
                        Enviar notificación
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Form >
                            <Form.Control as="textarea" rows={3} ref={txtMensaje} placeholder='Mensaje de notificación...' />
                            <div>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancelar
                                </Button>
                                <Button variant="primary" className='btn-enviar-noti' onClick={() => { enviarMensaje(); handleClose(); }}>
                                    Enviar
                                </Button>
                            </div>
                        </Form>
                    </Modal>
                    <div className='exportar'>
                        <label className='text-filtrar text-exportar'>Exportar usuarios en vista</label>
                        <button className='btn-exportar' onClick={handleExportUsuarios}>Exportar usuarios {descargar}</button>
                    </div>
                    
                </div>
            </div>
            {usuariosFiltrados? 
            <div className='contenedor-cards'>
                {usuariosFiltrados.map((usuario)=>{
                    if(usuario.rol !== "admin"){
                        return (
                            <div className='card-usuarios' key={usuario._id}>
                            <div className='cont-titulo-usuario'>
                                <div className='cont-card-foto'>
                                    <div>
                                        <p> {usuario.nombre} </p>
                                        <p> {usuario.apellido} </p>
                                    </div>
                                    <div className='cont-btn-eliminar'>
                                        <div className={usuario.estado === "Activo" ? "activo" : (usuario.estado === "Activo Parcial" ? "activo-parcial" : (usuario.estado === "Baja" ? "baja":(usuario.estado === "Inactivo" ? "inactivo" : "pendiente")))}>
                                        </div>
                                        <select ref={estado} defaultValue={usuario.estado} className='select-estado' onChange={(e) => handleEditarEstado(e, usuario._id)}>
                                            <option value="Activo">Activo</option>
                                            <option value="Inactivo">Inactivo</option>
                                            <option value="Baja">Baja</option>
                                            <option value="Pendiente">Pendiente</option>
                                        </select>
                                        <button className='btn-eliminar' onClick={() => handleBorrar(usuario._id)}>
                                            {eliminar}
                                        </button>
                                    </div>
                                </div>  
                            </div>
                            <p><span className='negrita'>DNI: </span>{usuario.dni} </p>
                            <p><span className='negrita'>CUIL: </span>{usuario.cuil} </p>
                            <p><span className='negrita'>Dirección: </span>{usuario.direccion} </p>
                            <p><span className='negrita'>Celular: </span>{usuario.cel} </p>
                            <p><span className='negrita'>Mail: </span>{usuario.mail} </p>
                            <p><span className='negrita'>Nacimiento: </span>{usuario.nacimiento} </p>
                            <p><span className='negrita nivel-estudio'>Nivel de Estudios: </span>{usuario.estudios} </p>
                            <p><span className='negrita'>Genero: </span>{usuario.genero} </p>
                            <p><span className='negrita'>Actividad: </span>{usuario.tarea} </p>
                            <p><span className='negrita'>Organización </span>{usuario.organizacion} </p>
                            <p><span className='negrita'>Referente: </span>{usuario.referente} </p>
                            <p><span className='negrita'>Hijes: </span>{usuario.hijos} </p>
                            {/* <div>
                                <Link to={Pdf} target='_blanck'>Ver CV</Link>
                            </div> */}
                            <Link className='cont-agregar' to={`/AdminUsuario/${usuario._id}`} >
                                
                                {agregar}
                            </Link>
                        </div>
                        )
                    }   
                })}
            </div>
            : <h1>Cargando</h1>}
        </div>
    )
}
export default Registradas
