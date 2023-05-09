import { useRef, useState} from "react"

function Formulario() {
    const [nombre, setNombre]= useState('')
    const dni = useRef()

    const handleSubmit = (e)=>{
        e.preventDefault() 
        console.log(nombre)   
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Registro de personas</h1>
                <div className="contenedor-nombre">
                    <label className="label" >
                        Apellido
                        <input type="text" name="apellido" placeholder="Ej. Rodriguez" />
                    </label>
                    <label className="label">
                        Nombre Completo
                        <input value={nombre} type="text" name="nombre" placeholder="Ej. Juan Ignacio" onChange={(e) => setNombre(e.target.value)}/>
                    </label>
                </div>
                <div className="contenedor-dni">
                    <label className="label">
                        DNI
                        <input type="text" ref={dni} name="dni"  />
                    </label>
                    <label className="label" id="cuil">
                        CUIL
                        <input type="text" name="cuil" />
                    </label>
                    <label className="label">
                        Cargar foto
                        <input type="text" name="foto" />
                    </label>
                </div>
                <div className="contenedor-domicilio">
                    <label className="label width-domocilio">
                        Domicilio
                        <input type="text" name="domicilio" />
                    </label>
                    <p>mapa</p>
                </div>
                <label className="label">
                    Telefono celular
                    <input type="text" name="telefono" />
                </label>
                <label className="label">
                    Mail
                    <input type="text" name="telefono" />
                </label>
                <label className="label">
                    Cargar CV
                    <input type="text" name="telefono" />
                </label>
                <label className="label">
                    Nivel de Estudios
                    <select>
                        <option>secundario</option>
                        <option>universitario</option>
                        <option>otro</option>
                    </select>
                </label>
                <input className="btn-enviar" type="submit" value="Enviar" />
            </form>
        </div>
    )

}

export default Formulario