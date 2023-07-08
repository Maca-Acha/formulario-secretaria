import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from 'react';
import { cargarServicio, traerServicios, borrarServicio, editarServicio } from "../redux/reducers/serviciosSlice"
import { useParams } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {FiEdit} from "react-icons/fi";

export default function Servicios(){
    const borrar = <RiDeleteBin5Fill />
    const editar = <FiEdit />

    const params = useParams()
    const dispatch = useDispatch()
    const servicios = useSelector((state) => state.servicios.servicios);
    const [editServicio, setEditServicio]= useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (params) {
                dispatch(traerServicios(params.id));
            }
        };
    
        fetchData();
    }, [params, dispatch]);
    

    const descripcion = useRef()
    const editado = useRef()
    
    function handleNuevoServicio(e) {
        e.preventDefault()
        dispatch(cargarServicio({
            id: params.id,
            body:{
                titulo: "descripcion",
                descripcion: descripcion.current.value
            }
        }));
        descripcion.current.value = ""
    }
    function handleEditarServicio(idServicio){
        console.log(idServicio)
        dispatch(editarServicio({
            id: idServicio,
            body:{
                descripcion: editado.current.value
            }
        }));
        console.log(editado)
    }
    function handleBorrarServicio(idServicio){
        dispatch(borrarServicio({
            idServicio
        }));
    }

    return(
        <div className='contenedor-usuario contenedor-usuario-admin'>
            <div className='card-servicios usuario-cont-admin' >
                <div className='cont-servicios'>
                    <div className='cont-servicio'>
                        <p className='titulo negrita titulo-servicios'>Servicios Adquiridos</p>
                        {servicios ? 
                        servicios.map((servicio, index) => 
                            <div key={index}>
                                
                                {editServicio ? (<form className="editor" onSubmit={ ()=> {handleEditarServicio(servicio._id)}}>
                                    <input
                                        ref={editado}
                                        className='input-editor'
                                        type="text"
                                        defaultValue={servicio.descripcion}
                                    />
                                </form>)
                                :<p >{servicio.descripcion}</p>}
                                <div className="btn-cursor btn-edit"  onClick={() => {setEditServicio(!editServicio)}}>{editar} </div>
                                <div onClick={() => handleBorrarServicio(servicio._id)} >{borrar}</div>
                            </div>
                        ):
                        <p>Cargando</p>}

                        <form className='servicios' onSubmit={handleNuevoServicio}>
                            <input ref={descripcion} type="text" placeholder="Describir servicio"  />
                            <input type="submit" className="btn-cursor btn-edit" value="Agregar" /> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}