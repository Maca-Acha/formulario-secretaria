import { useRef, useState} from "react"
import {Estudios, Generos, Tareas} from "./Constantes"

function Registro() {
    const dni = useRef()
    
    const [nombre, setNombre]= useState('') /* PRUEBA */
    const handleSubmit = (e)=>{
        e.preventDefault() 
        console.log(nombre)   
    }

    return(
        <main>
            <form onSubmit={handleSubmit}>
                <h1>Registro de personas</h1>
                <section className="contenedor-nombre">
                    <label className="label input_grande" >
                        Apellido
                        <input type="text" name="apellido" placeholder="Ej. Rodriguez" />
                    </label>
                    <label className="label input_grande">
                        Nombre Completo
                        <input value={nombre} type="text" name="nombre" placeholder="Ej. Juan Ignacio" onChange={(e) => setNombre(e.target.value)}/>
                    </label>
                </section>
                <section className="contenedor-dni">
                    <label className="label input_mediano">
                        DNI
                        <input type="text" ref={dni} name="dni" placeholder="Ej. 33333333" />
                    </label>
                    <label className="label input_mediano">
                        CUIL
                        <input type="text" name="cuil" placeholder="xx-xxxxxxxx-x"/>
                    </label>
                    <label className="label input_mediano" >
                        Fecha de nacimiento
                        <input type="date" name="nacimiento" />
                    </label>
                    
                </section>
                <div className="contenedor-domicilio">
                    <label className="label width-domocilio">
                        Domicilio
                        <input type="text" name="domicilio" placeholder="calle numero" />
                    </label>
                    <p>mapa</p>
                </div>
                <section className="contenedor-celMail">
                    <label className="label input_grande">
                        Telefono celular
                        <input type="tel" name="telefono" placeholder="Ej. 115555555"/>
                    </label>
                    <label className="label input_grande">
                        Mail
                        <input type="email" name="mail" placeholder="Ej. ejemplo@gamil.com" />
                    </label>
                </section>
                <section className="cargar_archivo">
                    <label className="label">
                        Cargar CV
                        <input className="cargar" type="file" name="cv" accept=".pdf, .doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                    </label>
                    <label className="label">
                        Cargar foto
                        <input className="cargar" type="file" name="foto" accept="image/*"/>
                    </label>
                </section>
                <label className="label">
                    Nivel de Estudios
                    <select>
                        <option disabled="disabled">Seleccione una opcion</option>
                        {Estudios.map((estudio, index)=>{
                            return <option value={estudio} key={index}>{estudio}</option>
                        })}
                    </select>
                </label>
                <label className="label">
                    Género 
                    <div className="generos">
                        {Generos.map((genero, index)=>{
                            return <label className="genero" key={index}>
                                    <input value={genero} type="radio" />
                                    {genero}
                                </label>
                            })}
                    </div>
                </label>
                <section className="militancia">
                    <label className="label input_mediano">
                        Tarea
                        <select>
                        <option disabled="">Especificar tarea</option>
                        {Tareas.map((tarea, index)=>{
                            return <option value={tarea} key={index}>{tarea}</option>
                        })}
                    </select>
                    </label>
                    <label className="label input_mediano">
                        Organización
                        <input type="text" name="orga" placeholder="Especificar organización" />
                    </label>
                    <label className="label input_mediano">
                        Referente
                        <input type="text" name="referente" placeholder="Especificar referente" />
                    </label>
                </section>
                <label className="label">
                    Hijos
                    <input type="text" name="hijos" placeholder="Cantidad de hijos" />
                </label>
                <input className="btn-enviar" type="submit" value="Enviar" />
            </form>
        </main>
    )

}

export default Registro