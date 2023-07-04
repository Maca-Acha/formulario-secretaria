export default function Usuario(){
    return(
        <div className='contenedor-usuario contenedor-usuario-admin'>
            <div className='card-servicios usuario-cont-admin' >
                <div className='cont-servicios'>
                    <div className='cont-servicio'>
                        <p className='titulo negrita titulo-servicios'>Servicios Adquiridos</p>
                        <form className='servicios'>
                            <input type="text" placeholder="Describir servicio"/>
                            <input type="submit" className="btn-cursor btn-edit" value="Agregar" /> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}