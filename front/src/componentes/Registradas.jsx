import '../Registradas.css'
import { useEffect, useRef } from "react"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsuarios, borrarUsuario } from "../redux/reducers/usuarioSlice"
import { filtrarUsuarios, 
        setFiltro, 
        setOrganizacionFiltro, 
        usuariosPorOrga, 
        usuariosPorRef, 
        setReferenteFiltro } from "../redux/reducers/filtroSlice"
import { AiFillPlusCircle } from 'react-icons/ai'
import { RiDeleteBin5Fill } from "react-icons/ri"
import {Organizaciones, Referentes} from "./Constantes"
/* import Pdf from './pdf' */
import Swal from 'sweetalert2'


function Registradas(){
    const dispatch = useDispatch()
    const usuarios = useSelector((state) => state.usuario.usuarios)
    const filtro = useSelector((state) => state.filtro.filtro) || ""
    const organizacionFiltro = useSelector((state) => state.filtro.organizacionFiltro) || ""
    const referenteFiltro = useSelector((state) => state.filtro.referenteFiltro) || ""
    const agregar = <AiFillPlusCircle className='agregar' />
    const eliminar = <RiDeleteBin5Fill />

    useEffect(() => {
        dispatch(fetchUsuarios());  
        
    }, [dispatch])

    const inputBuscar = useRef()
    const organizacion = useRef()
    const referente = useRef()

    //Filtros
    const handleBuscar = () => {
        const inputValue = inputBuscar.current.value;
        if (filtro !== inputValue) {
            dispatch(filtrarUsuarios(inputValue));
        }
        dispatch(setFiltro(inputValue));
    }
    const handleFiltrarPorOrganizacion = () => {
        const organizacionValue = organizacion.current.value;
        if (organizacionFiltro !== organizacionValue) {
            dispatch(usuariosPorOrga(organizacionValue));
        }
        dispatch(setOrganizacionFiltro(organizacionValue));
    };
    const handleFiltrarPorReferente = () => {
        const referenteValue = referente.current.value;
        if (referenteFiltro !== referenteValue) {
            dispatch(usuariosPorRef(referenteValue));
        }
        dispatch(setReferenteFiltro(referenteValue));
    };
    const buscarUsuario = (buscar) => {
        const organizacionLower = organizacionFiltro ? organizacionFiltro.toLowerCase() : '';
        const referenteLower = referenteFiltro ? referenteFiltro.toLowerCase() : '';
        const buscarLower = buscar ? buscar.toLowerCase().trim() : '';
        return usuarios.filter((usuario) => {
            const organizacionUsuarioLower = usuario.organizacion ? usuario.organizacion.toLowerCase() : '';
            const referenteUsuarioLower = usuario.referente ? usuario.referente.toLowerCase() : '';
            const nombre = usuario.nombre ? usuario.nombre.toLowerCase().startsWith(buscarLower) : false;
            const apellido = usuario.apellido ? usuario.apellido.toLowerCase().startsWith(buscarLower) : false;
            const dni = usuario.dni ? usuario.dni.toLowerCase().startsWith(buscarLower) : false;
            const cuil = usuario.cuil ? usuario.cuil.toLowerCase().startsWith(buscarLower) : false;
            return (
                (organizacionLower === '' || organizacionUsuarioLower === organizacionLower) &&
                (referenteLower === '' || referenteUsuarioLower === referenteLower) &&
                (nombre || apellido || dni || cuil)
            );
        });
    };
    const usuariosFiltrados = buscarUsuario(filtro);

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

    /* //Subir CSV
    const handleFileChange = async (event) => {
        try {
            const archivoSeleccionado = event.target.files[0];
            const datosDelArchivo = await leerArchivoCSV(archivoSeleccionado);
            toast.success('Se han agregado los usuarios del archivo Excel, aprete el boton Cagar para actualizar la pagina', {
                position: toast.POSITION.TOP_RIGHT
            });
            const urlAPI = "http://localhost:4000/api/usuarios"; 
            const respuesta = await axios.post(urlAPI, datosDelArchivo);
            console.log("Datos enviados correctamente:", respuesta.data);
        } catch (error) {
            console.error("Error al leer o enviar el archivo:", error);
        }
    };

    //Traer usuarios
    const traerUsuarios = async () =>{
        dispatch(fetchUsuarios())
    } */

    return(
        <div className='cont-contenedor-cards'>
            <form className='cont-buscador' >
                <div className='usuarios-csv'>
                    <label className='text-filtrar'>Filtrar</label>
                    <div className='buscador'>
                        <input
                            className='input-buscar input-form'
                            type='text'
                            placeholder='Buscar'
                            ref={inputBuscar}
                            onChange={handleBuscar}
                        />
                        <select className='input-form' ref={organizacion} onChange={handleFiltrarPorOrganizacion}>
                            {Organizaciones.map((orga, index)=>{
                                return (
                                <option  value={orga.value} key={index}>{orga.text}</option>
                            )})}
                        </select>
                        <select className='input-form' ref={referente} onChange={handleFiltrarPorReferente}>
                            {Referentes.map((referente, index)=>{
                                return (
                                <option value={referente.value} key={index}>{referente.text}</option>
                            )})}
                        </select>
                    </div>

                </div>
                {/* <div className='usuarios-csv'>
                    <label className='titulo-usuarios-csv'>Cargar usuarios con archivo Excel</label>
                    <div className='agregar-usuarios-csv'>
                        <input type='file' id='inputArchivo' className='input-form' onChange={handleFileChange} />
                        <button className='btn-agregar-csv' onClick={() => traerUsuarios()} >Cargar</button>
                    </div>
                </div> */}
            </form>
            {usuarios && usuariosFiltrados ? 
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
                                    {/* <p className='card-foto'>Foto</p> */}
                                    <div className='cont-btn-eliminar'>
                                        <p className={usuario.estado === "Activo" ? "activo" : (usuario.estado === "Activo Parcial" ? "activo-parcial" : (usuario.estado === "Baja" ? "baja":(usuario.estado === "Inactivo" ? "inactivo" : "pendiente")))}>{usuario.estado}</p>
                                        {console.log(usuario)}
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
                            <p><span className='negrita'>Terea: </span>{usuario.tarea} </p>
                            <p><span className='negrita'>Organización </span>{usuario.organizacion} </p>
                            <p><span className='negrita'>Referente: </span>{usuario.referente} </p>
                            <p><span className='negrita'>Hijos: </span>{usuario.hijos} </p>
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