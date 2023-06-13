import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import {Estudios, Generos, Tareas} from "./Constantes"
import { registrarUsuario } from "../redux/reducers/usuarioSlice"
import axios from 'axios';

function Registro() {
    const dispatch = useDispatch()

    const apellido = useRef()
    const nombre = useRef()
    const dni = useRef()
    const cuil = useRef()
    const fecha = useRef()
    const domicilio = useRef()
    const telefono = useRef()
    const mail = useRef()
    const cv = useRef()
    const foto = useRef()
    const estudios = useRef()
    const tareas = useRef()
    const organizacion = useRef()
    const referente = useRef()
    const hijos = useRef()
    const [generoSeleccionado, setGeneroSeleccionado] = useState("");

    const handleAddUser = (e) => {
        e.preventDefault() 
        dispatch(registrarUsuario({
            apellido:apellido.current.value, 
            nombre:nombre.current.value,
            dni:dni.current.value,
            cuil:cuil.current.value,
            direccion:domicilio.current.value, 
            cel:telefono.current.value, 
            mail:mail.current.value, 
            nacimiento:fecha.current.value, 
            estudios:estudios.current.value, 
            genero:generoSeleccionado,
            tarea:tareas.current.value, 
            organizacion:organizacion.current.value, 
            referente:referente.current.value, 
            hijos:hijos.current.value, 
        }))

        const cvFile = cv.current.files[0];
        const fotoFile = foto.current.files[0];

        const formData = new FormData();
        const formDataFoto = new FormData();
        formData.append('cv', cvFile);
        formDataFoto.append('foto', fotoFile);
        
        axios.post('http://localhost:4000/api/archivos', formData)
            .then(response => {
                console.log('Archivo guardado correctamente:', response.data);
            })
            .catch(error => {
                console.error('Error al guardar el archivo:', error);
            });
            axios.post('http://localhost:4000/api/archivosFoto', formDataFoto)
            .then(response => {
                console.log('Archivo guardado correctamente:', response.data);
            })
            .catch(error => {
                console.error('Error al guardar el archivo:', error);
            });
    }

    return(
        <main>
            <form onSubmit={handleAddUser} encType="multipart/form-data">
                <h1>Registro de personas</h1>
                <section className="contenedor-nombre">
                    <label className="label input_grande" >
                        Apellido
                        <input type="text" ref={apellido} name="apellido" placeholder="Ej. Rodriguez" />
                    </label>
                    <label className="label input_grande">
                        Nombre Completo
                        <input  type="text" ref={nombre} name="nombre" placeholder="Ej. Juan Ignacio"/>
                    </label>
                </section>
                <section className="contenedor-dni">
                    <label className="label input_mediano">
                        DNI
                        <input type="text" ref={dni} name="dni" placeholder="Ej. 33333333" />
                    </label>
                    <label className="label input_mediano">
                        CUIL
                        <input type="text" ref={cuil} name="cuil" placeholder="xx-xxxxxxxx-x"/>
                    </label>
                    <label className="label input_mediano" >
                        Fecha de nacimiento
                        <input type="date" ref={fecha} name="nacimiento" />
                    </label>
                    
                </section>
                <div className="contenedor-domicilio">
                    <label className="label width-domocilio">
                        Domicilio
                        <input type="text" ref={domicilio} name="domicilio" placeholder="Calle y altura" />
                    </label>
                    <p>mapa</p>
                </div>
                <section className="contenedor-celMail">
                    <label className="label input_grande">
                        Telefono celular
                        <input type="tel" ref={telefono} name="telefono" placeholder="Ej. 115555555"/>
                    </label>
                    <label className="label input_grande">
                        Mail
                        <input type="email" ref={mail} name="mail" placeholder="Ej. ejemplo@gamil.com" />
                    </label>
                </section>
                <section className="cargar_archivo">
                    <label className="label">
                        Cargar CV
                        <input id="cvInput" className="cargar" ref={cv} type="file" name="cv" accept=".pdf" />
                    </label>
                    <label className="label">
                        Cargar foto
                        <input id="fotoInput" className="cargar" ref={foto} type="file" name="foto" accept="image/*"/>
                    </label>
                </section>
                <label className="label">
                    Nivel de Estudios
                    <select ref={estudios}>
                        <option disabled="disabled">Seleccione una opcion</option>
                        {Estudios.map((estudio, index)=>{
                            return (
                            <option value={estudio} key={index}>{estudio}</option>
                        )})}
                    </select>
                </label>
                <label className="label">
                    Género 
                    <div className="generos">
                        {Generos.map((genero, index)=>{
                            return( 
                                <label className="genero" key={index}>
                                    <input value={genero} type="radio" checked={generoSeleccionado === genero} onChange={() => setGeneroSeleccionado(genero)} />
                                    {genero}
                                </label>
                                )
                            })}
                    </div>
                </label>
                <section className="militancia">
                    <label className="label input_mediano">
                        Tarea
                        <select ref={tareas}>
                        {Tareas.map((tarea, index)=>{
                            return(
                                <option value={tarea.text} disabled={tarea.disabled} key={index}>{tarea.text}</option>
                                )
                        })}
                    </select>
                    </label>
                    <label className="label input_mediano">
                        Organización
                        <input type="text" name="orga" ref={organizacion} placeholder="Especificar organización" />
                    </label>
                    <label className="label input_mediano">
                        Referente
                        <input type="text" name="referente" ref={referente} placeholder="Especificar referente" />
                    </label>
                </section>
                <label className="label">
                    Hijos
                    <input type="text" name="hijos" ref={hijos} placeholder="Cantidad de hijos" />
                </label>
                <input className="btn-enviar" type="submit" value="Enviar" />
            </form>
        </main>
    )

}

export default Registro