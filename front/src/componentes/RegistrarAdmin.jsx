import { useRef } from "react"
import { useDispatch } from "react-redux"
import { registrarUsuario } from "../redux/reducers/usuarioSlice"
import Swal from 'sweetalert2'

function RegistrarAdmin() {
    const dispatch = useDispatch()

    const apellido = useRef()
    const nombre = useRef()
    const dni = useRef()
    const cuil = useRef()
    const fecha = useRef()
    const telefono = useRef()
    const mail = useRef()
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
                cel:telefono.current.value, 
                mail:mail.current.value,  
                contrasena:contrasena.current.value,
                rol:"admin"
            }))
        }        

        apellido.current.value = "" 
        nombre.current.value = ""
        dni.current.value = ""
        cuil.current.value = ""
        telefono.current.value = "" 
        mail.current.value = "" 
        fecha.current.value = "" 
        contrasena.current.value = ""
        contrasena2.current.value = ""
    }

    return(
        <main className="cont-registrar-admin">
            <form className="form-registrarse form-registrarse-admin" onSubmit={handleAddUser} encType="multipart/form-data">
                <h1 className="titulo-registro">Registrar Administrador</h1>
                <section className="contenedor-nombre">
                    <label className="label input_grande" >
                        Apellido
                        <input className="input-form" type="text" ref={apellido} required={true} name="apellido" placeholder="Ej. Rodriguez" />
                    </label>
                    <label className="label input_grande">
                        Nombre Completo
                        <input className="input-form" type="text" ref={nombre} required={true} name="nombre" placeholder="Ej. Juan Ignacio"/>
                    </label>
                </section>
                <section className="contenedor-nombre">
                    <label className="label input_grande">
                        DNI
                        <input className="input-form" type="text" ref={dni} required={true} name="dni" placeholder="Ej. 33333333" />
                    </label>
                    <label className="label input_grande">
                        CUIL
                        <input className="input-form" type="text" ref={cuil} name="cuil" placeholder="xx-xxxxxxxx-x"/>
                    </label>
                </section>
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
                <input className="btn-enviar btn-liso" type="submit" value="Enviar" />
            </form>
        </main>
    )
}

export default RegistrarAdmin