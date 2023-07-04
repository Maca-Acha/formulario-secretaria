const Servicios = require('../models/ServiciosModel')

const serviciosControllers = {
    postServicio: async (req, res) => {
        const usuario = req.params.usuarioId;
        const { titulo, descripcion } = req.body;
        try {
                const servicio = await new Servicios({ usuario, titulo, descripcion }).save();
                res.json({
                    success: true,
                    response: servicio,
                    error: null
                });
            } catch (e) {
                res.json({ success: false, error: e, response: null });
                console.error(e);
        }
    },
    traerServiciosByUsuario: (req, res) => {
        Servicios.find({ usuario: req.params.usuarioId })
            .then((response) => {
                res.json({ response });
            })
            .catch((err) => {
                console.log(err);
                res.json({ error: err });
            });
    },
    traerServicio:(req,res)=>{
        Servicios.findOne({_id: req.params.id})
            .then((response) =>{res.json({response})
    })  
    },
    traerTodosServicios:(req,res)=>{
        Servicios.find()
        .then((response)=> res.json({response}))
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