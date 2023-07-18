const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    apellido: {type: String},
    nombre: {type: String},
    dni: {type: String, required:true},
    cuil: {type: String},
    foto: {type: String},
    direccion: {type: String},
    cel: {type: String},
    mail: {type: String, required:true},
    cv: {type: Object},
    estudios: {type: String},
    nacimiento: {type: String},
    genero: {type: String},
    tarea: {type: String},
    organizacion: {type: String},
    referente: {type: String},
    hijos: {type: String},
    contrasena: {type: String, required:true},
    token:{type:String},
    rol:{type:String}
})

const UserModel = model('usuarios', userSchema)

module.exports = UserModel