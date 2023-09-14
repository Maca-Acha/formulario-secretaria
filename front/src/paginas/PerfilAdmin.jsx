import { useEffect} from "react"
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function PerfilAdmin(){
    const mas = <AiOutlinePlusCircle/>
    useEffect(() => {
        
    }, []);

    return(
        <div className="cont-btns-inicio">
            <div className="pad-admin">
                <div className="bloque-usuarios-Admin">
                    <div className="cargar-usuarios-admin">
                        <h2 className="titulos-card-admin">Cargar Usuarios</h2>
                        <div className="btns-cargar-usuarios">
                            <button className="btn-individual">Individual</button>
                            <button className="btn-lote">En Lote</button>
                        </div>
                    </div>
                    <div className="direccionAregistradas">
                        <h2 className="titulos-card-admin">Administrar Usuarios</h2>                
                        <button className="btn-registrados">Usuarios Registrados</button>
                    </div>
                </div>
                <div className="agregar-administrador">
                    <button className="btn-agregar-admin"> Agregar Administrador <span className="mas-agregar">{mas}</span></button>
                </div> 
            </div>
        </div>
    )
}