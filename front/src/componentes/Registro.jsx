import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import {Estudios, Generos, Actividad, Referentes, Organizaciones, Barrios} from "./Constantes"
import { registrarUsuario } from "../redux/reducers/usuarioSlice"
import axios from 'axios';
import Swal from 'sweetalert2'

function Registro() {
    const dispatch = useDispatch()

    const apellido = useRef()
    const nombre = useRef()
    const dni = useRef()
    const cuil = useRef()
    const fecha = useRef()
    const domicilio = useRef()
    const barrio = useRef()
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
    const contrasena = useRef()
    const contrasena2 = useRef()

    const handleAddUser = (e) => {
        e.preventDefault()
        const contra1 = contrasena.current.value
        const contra2 = contrasena2.current.value
        if(contra1 !== contra2 ){
            Swal.fire('Haz ingresado contraseñas distintas')
        }else{
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
                contrasena:contrasena.current.value
            }))
        }
        
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

        apellido.current.value = "" 
        nombre.current.value = ""
        dni.current.value = ""
        cuil.current.value = ""
        domicilio.current.value = "" 
        telefono.current.value = "" 
        mail.current.value = "" 
        fecha.current.value = "" 
        estudios.current.value = "" 
        tareas.current.value = "" 
        organizacion.current.value = "" 
        referente.current.value = "" 
        hijos.current.value = "" 
        contrasena.current.value = ""
    }

    return(
        <main>
            <form className="form-registrarse" onSubmit={handleAddUser} encType="multipart/form-data">
                <h2 className="titulo-registro">Registro de personas</h2>
                <section className="contenedor-nombre">
                    <label className="label input_grande" >
                        Apellido
                        <input className="input-form" type="text" ref={apellido} required={true} name="apellido" placeholder="Ej. Rodriguez" />
                    </label>
                    <label className="label input_grande">
                        Nombre Completo
                        <input className="input-form" type="text" ref={nombre} required={true} name="nombre" placeholder="Ej. Juan Ignacio"/>
                    </label>
                    
                    <label className="label input_mediano">
                        DNI
                        <input className="input-form" type="text" ref={dni} required={true} name="dni" placeholder="Ej. 33333333" />
                    </label>
                    <label className="label input_mediano">
                        CUIL
                        <input className="input-form" type="text" ref={cuil} name="cuil" placeholder="xx-xxxxxxxx-x"/>
                    </label>
                    <label className="label input_mediano" >
                        Fecha de nacimiento
                        <input className="input-form" type="date" ref={fecha} name="nacimiento" />
                    </label>
                    
                </section>
                <div className="contenedor-domicilio">
                    <label className="label width-domocilio">
                        Domicilio
                        <input className="input-form" type="text" ref={domicilio} name="domicilio" placeholder="Calle y altura" />
                    </label>
                    <label >
                        Barrio
                        <select ref={barrio} className="input-form input-barrio">
                            {Barrios.map((barrio, index)=>{
                                return (
                                <option value={barrio.value} key={index}>{barrio.text}</option>
                            )})}
                        </select>
                    </label>
                </div>
                <section className="contenedor-celMail">
                    <label className="label input_grande">
                        Telefono celular
                        <input className="input-form" type="tel" ref={telefono} required={true} name="telefono" placeholder="Ej. 115555555"/>
                    </label>
                    <label className="label input_grande">
                        Mail
                        <input className="input-form" type="email" ref={mail} required={true} name="mail" placeholder="Ej. ejemplo@gamil.com" />
                    </label>
                </section>
                <section className="cargar_archivo">
                    <label className="label">
                        Cargar CV
                        <input id="cvInput" className="cargar input-form" ref={cv} type="file" name="cv" accept=".pdf" />
                    </label>
                    <label className="label">
                        Cargar foto
                        <input id="fotoInput" className="cargar input-form" ref={foto} type="file" name="foto" accept="image/*"/>
                    </label>
                </section>
                
                <label className="label">
                    Nivel de Estudios
                    <select ref={estudios} className="input-form">
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
                        Actividad
                        <select ref={tareas} className="input-form">
                            {Actividad.map((tarea, index)=>{
                                return(
                                    <option value={tarea.text} disabled={tarea.disabled} key={index}>{tarea.text}</option>
                                    )
                            })}
                        </select>
                    </label>
                    <label className="label input_mediano">
                        Organización
                        <select ref={organizacion} className="input-form">
                            {Organizaciones.map((organizacion, index)=>{
                                return(
                                    <option value={organizacion.text} disabled={organizacion.disabled} key={index}>{organizacion.text}</option>
                                    )
                            })}
                        </select>
                    </label>
                    <label className="label input_mediano">
                        Referente
                        <select ref={referente} required={true} className="input-form">
                            {Referentes.map((referente, index)=>{
                                return(
                                    <option value={referente.text} disabled={referente.disabled} key={index}>{referente.text}</option>
                                    )
                            })}
                        </select>
                    </label>
                </section>
                <label className="label">
                    Hijos
                    <input className="input-form" type="text" name="hijos" ref={hijos} placeholder="Cantidad de hijos" />
                </label>
                <label className="label">
                    Contraseña
                    <input className="input-form" type="password" required={true} name="contrasena" ref={contrasena} placeholder="Cree una contraseña"/>
                </label>
                <label className="label">
                    Repetir contraseña
                    <input
                        className="input-form"                       
                        type="password"
                        name="contrasena"
                        ref={contrasena2}
                        placeholder="Repita la contraseña"
                    />
                </label>
                <input className="btn-enviar" type="submit" value="Enviar" />
            </form>
        </main>
    )
}

export default Registro