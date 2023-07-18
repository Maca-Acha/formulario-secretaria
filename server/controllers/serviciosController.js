const Servicios = require('../models/ServiciosModel')

const serviciosControllers = {
    postServicio: async (req, res) => {
        const usuario = req.params.usuarioId;
        const { titulo, descripcion, fecha } = req.body;
        try {
                const servicio = await new Servicios({ usuario, titulo, descripcion, fecha }).save();
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
    traerServiciosByUsuario: async (req, res) => {
        const usuarioId = req.params.usuarioId;
        try {
            const serviciosUsuario = await Servicios.find({ usuario: usuarioId });
            res.json({
                success: true,
                response: serviciosUsuario,
                error: null
            });
            } catch (error) {
            res.json({ success: false, error: error, response: null });
            console.error(error);
            }
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
        const usuarioId = req.body.usuario
        let servicios
        try{
            await Servicios.findOneAndDelete({_id:id})
            servicios = await Servicios.find({usuario: usuarioId})
        }catch(error){
        console.log(error)
        }
        res.json({response: servicios, success:true})
    }
}

module.exports = serviciosControllers 