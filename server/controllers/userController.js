const Usuario = require("../models/UserModel")
const bcryptjs = require ('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
    readUsers:(req,res) => {
        Usuario.find().then((response)=>{
            res.json({response})
        })
    },
    returnUser:(req,res) => {
        Usuario.findOne({_id: req.params.id})
        .then((response)=>{
            res.json({response})
        })
    },
    newUser: async(req,res) => {
        const {apellido,nombre,dni,cuil,nacimiento,foto,direccion,cel,mail,cv,estudios,genero,tarea,organizacion,referente,hijos, contrasena} = req.body
        try{
            const userExist = await Usuario.findOne({mail})
            if (userExist){
                res.json({success: false, error: "The username is already registered", response:null})
            }else{
                const contraHasheada = bcryptjs.hashSync(contrasena, 10)
                const newUser = new Usuario ({apellido,nombre,dni,cuil,foto,direccion,cel,mail,cv,estudios,nacimiento,genero,tarea,organizacion,referente,hijos,contrasena:contraHasheada})
                const token = jwt.sign({...newUser}, process.env.SECRETO)
                await newUser.save()
                res.json({success: true, response: {newUser, token}, error: null})
            }
        }catch(error){
            res.json({success: false, response: null, error: error})
        }
    },
    signIn: async (req, res) => {
        const { dni, contrasena } = req.body;
        try {
            const dniExist = await Usuario.findOne({ dni });
            if (!dniExist) {
                return res.json({ success: false, error: "El DNI es incorrecto", response: null });
            }
            const contrasenaSuccess = bcryptjs.compareSync(contrasena, dniExist.contrasena);
            if (contrasenaSuccess) {
                const token = jwt.sign({...dniExist}, process.env.SECRETO)
                return res.json({ success: true, response: { dniExist, token }, error: null });
            } else {
                return res.json({ success: false, error: "La contraseña es incorrecta", response: null });
            }
        } catch (error) {
            return res.json({ success: false, response: null, error: error });
        }
    }
}

module.exports = userController