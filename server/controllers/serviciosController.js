const Servicios = require('../models/ServiciosModel')

const serviciosControllers = {
    postServicio:(req,res)=>{
        new Servicios(req.body).save()
        .then((response)=> res.json({servicio: response, success:true})) //para que en el postman te informe si se guardo o no
        .catch((e) => res.json({error: e.errors, success:false}))
    }, 
    traerServicio:(req,res)=>{
        Servicios.findOne({_id: req.params.id})
            .then((response) =>{res.json({response})
    })  
    },
    traerServicios:(req,res)=>{
        Servicios.find()
        .populate('usuarios')
        .then((response)=> res.json({response}))
    }, 
    traerServiciosByUsuario: (req, res) => {
        Servicios.find({usuario: {_id: req.params.usuarioId}})
            .then((response) => {
                res.json({response})
            })
            .catch((err) => console.log(err))
    },
    editarServicio: async(req,res) => {
        try{
            actualizado = await Servicios.findOneAndUpdate({_id:req.params.id}, {...req.body}, {new:true})
        }catch(error){
            console.log(error)
        }
        res.json({success:actualizado ? true : false})
    },
    borrarServicio: async (req,res) =>{
        const id = req.params.id
        let sevicios
        try{
            await Servicios.findOneAndDelete({_id:id})
            sevicios = await Servicios.find()
        }catch(error){
        console.log(error)
        }
        res.json({response: sevicios, success:true})
    }
}

module.exports = serviciosControllers 