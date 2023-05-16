const UserModel = require("../models/UserModel")

const userController = {
    readUsers:(req,res) => {
        UserModel.find().then((response)=>{
            console.log(response)
            res.json({response})
        })
    },
    signUp: async(req,res) => {
        const {email} = req.body
        try{
            const userExist = await UserModel.findOne({email})
            if (userExist){
                res.json({success: false, error: "The username is already registered", response:null})
            }else{
                const newUser = new UserModel (req.body)
                await newUser.save() //guarda en el mongo de mierda 
                res.json({success: true, response: {newUser}, error: null})
            }
        }catch(error){
            res.json({success: false, response: null, error: error})
        }
    }
}

module.exports = userController