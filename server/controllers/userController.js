const UserModel = require("../models/UserModel")

const userController = {
    readUsers:(req,res) => {
        UserModel.find().then((response)=>{
            res.json({response})
        })
    },
    newUser: async(req,res) => {
        const {apellido,nombre,dni,cuil,nacimiento,foto,direccion,cel,mail,cv,estudios,genero,tarea,organizacion,referente,hijos} = req.body
        console.log(cv)
        try{
            const userExist = await UserModel.findOne({mail})
            if (userExist){
                res.json({success: false, error: "The username is already registered", response:null})
            }else{
                const newUser = new UserModel ({apellido,nombre,dni,cuil,foto,direccion,cel,mail,cv,estudios,nacimiento,genero,tarea,organizacion,referente,hijos})
                await newUser.save()
                res.json({success: true, response: {newUser}, error: null})
            }
        }catch(error){
            res.json({success: false, response: null, error: error})
        }
    }
}

module.exports = userController