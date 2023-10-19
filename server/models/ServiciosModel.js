const mongoose = require('mongoose')

const servicioSchema = mongoose.Schema({
    fecha:{type:String}, 
    descripcion:{type:String, required:true},  
    usuario:{type: mongoose.Types.ObjectId, ref:'usuarios'}
})

const Servicio = mongoose.model('servicios',servicioSchema)

module.exports = Servicio