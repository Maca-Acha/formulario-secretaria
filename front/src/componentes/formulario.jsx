function Formulario() {
    return(
        <div>
            <form>
                <div className="contenedor-nombre">
                    <label className="label">
                        Apellido
                        <input type="text" name="apellido" placeholder="Ej. Rodriguez" />
                    </label>
                    <label className="label">
                        Nombre Completo
                        <input type="text" name="nombre" placeholder="Ej. Juan Ignacio"/>
                    </label>
                </div>
                <div className="contenedor-dni">
                    <label className="label">
                        DNI
                        <input type="text" name="dni" />
                    </label>
                    <label className="label">
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
                <input type="submit" value="Submit" />
            </form>
        </div>
    )

}

export default Formulario