const {Schema, model} = require('mongoose')

const usuarioSchema = new Schema({
    apellido: String,
    nombre: String,
    dni: String,
    cuil: String,
    foto: URL,
    direccion: String,
    cel: String,
    mail: String,
    cv: String,
    estudios: String,
    nacimiento: Date,
    genero: String,
    tarea: String,
    organizacion: String,
    referente: String,
    hijos: String
})

const Usuario = model('Usuario', usuarioSchema)

module.exports = Usuario