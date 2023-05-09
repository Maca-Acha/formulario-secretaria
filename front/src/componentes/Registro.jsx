import { useRef, useState} from "react"

function Registro() {
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
                        <input type="text" ref={dni} name="dni" placeholder="Ej. 33333333" />
                    </label>
                    <label className="label" id="cuil">
                        CUIL
                        <input type="text" name="cuil" placeholder="xx-xxxxxxxx-x"/>
                    </label>
                    <label className="label">
                        Cargar foto
                        <input type="file" name="foto" accept="image/*"/>
                    </label>
                </div>
                <div className="contenedor-domicilio">
                    <label className="label width-domocilio">
                        Domicilio
                        <input type="text" name="domicilio" placeholder="calle numero" />
                    </label>
                    <p>mapa</p>
                </div>
                <label className="label">
                    Telefono celular
                    <input type="text" name="telefono" placeholder="Ej. 115555555"/>
                </label>
                <label className="label">
                    Mail
                    <input type="text" name="mail" placeholder="Ej. ejemplo@gamil.com"/>
                </label>
                <label className="label">
                    Cargar CV
                    <input type="file" name="cv" accept=".pdf, .doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={e => {console.log(e.target.files)}} />
                </label>
                <label className="label">
                    Nivel de Estudios
                    <select>
                        <option disabled="disabled">Seleccione una opcion</option>
                        <option value="Primaria">Primaria</option>
                        <option value="Secundario">Secundario</option>
                        <option value="Universitario">Universitario</option>
                        <option value="Terciario">Terciario</option>
                        <option value="Otro">Otro</option>
                    </select>
                </label>
                <input className="btn-enviar" type="submit" value="Enviar" />
            </form>
        </div>
    )

}

export default Registro