export default function Usuario(){
    return(
        <div className='contenedor-usuario'>
            <div className='card-usuarios usuario-cont' >
                <div className='cont-card-foto'>
                    <div className='cont-titulo'>
                        <p className='titulo'>Servicios Adquiridos</p>
                        <form>
                            <input type="text" placeholder="Describir servicio"/>
                            <input type="submit" className="btn-cursor btn-edit" value="Agregar" /> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}