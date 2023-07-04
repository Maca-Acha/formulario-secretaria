const mongoose = require('mongoose')

const servicioSchema = mongoose.Schema({
    title:{type:String, required:true}, 
    description:{type:String, required:true},  
    usuario:{type: mongoose.Types.ObjectId, ref:"usuarios"}
})

const Servicio = mongoose.model("activity",servicioSchema)

module.exports = Servicio