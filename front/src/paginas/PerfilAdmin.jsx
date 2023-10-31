import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import  leerArchivoCSV  from '../archivos/leerArchivoCSV'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useState } from "react";

export default function PerfilAdmin(){
    const mas = <AiOutlinePlusCircle/>

    const [cargarLote, setcargarLote] = useState(false);
    
    //Subir CSV
    const handleFileChange = async (event) => {
        try {
            const archivoSeleccionado = event.target.files[0];
            const datosDelArchivo = await leerArchivoCSV(archivoSeleccionado);
            toast.success('Se han agregado los usuarios del archivo Excel, aprete el boton Cagar para actualizar la pagina', {
                position: toast.POSITION.TOP_RIGHT
            });
            const urlAPI = "http://200.58.96.142/:4000/api/usuarios"; 
            const respuesta = await axios.post(urlAPI, datosDelArchivo);
            console.log("Datos enviados correctamente:", respuesta.data);
        } catch (error) {
            console.error("Error al leer o enviar el archivo:", error);
        }
    };

    return(
        <div className="cont-btns-inicio">
            <div className="pag-admin">
                <div className="bloque-usuarios-Admin">
                    <div className="cargar-usuarios-admin">
                        <h2 className="titulos-card-admin">Cargar Usuarios</h2>
                        <div className="btns-cargar-usuarios">
                            <Link to="/Registrarse"  className="btn-individual">Individual</Link>
                            <Link className="btn-lote" onClick={() => setcargarLote(!cargarLote)}>En Lote</Link>

                        </div>
                        <div className={cargarLote === true ? "esta" : "noesta"}>
                            <div className='usuarios-csv'>
                                <label className='titulo-usuarios-csv'>Cargar usuarios con archivo Excel</label>
                                <div className='agregar-usuarios-csv'>
                                    <input type='file' id='inputArchivo' className='input-form' onChange={handleFileChange} />
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className="direccionAregistradas">
                        <h2 className="titulos-card-admin">Administrar Usuarios</h2>                
                        <Link to="/Registradas" className="btn-registrados">Usuarios Registrados</Link>
                    </div>
                </div>
                <div className="agregar-administrador">
                    <Link to="/AgregarAdmin" className="btn-agregar-admin"> Agregar Administrador <span className="mas-agregar">{mas}</span></Link>
                </div> 
            </div>
        </div>
    )
}