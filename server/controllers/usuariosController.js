const Usuario = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mailer"); 

const usuariosController = {
    verUsuarios:(req,res) => {
        Usuario.find().then((response)=>{
            res.json({response})
        })
    },
    traerUsuarios:(req,res) => {
        Usuario.findOne({_id: req.params.id})
        .then((response)=>{
            res.json({response})
        })
    },
    nuevosUsuario: async (req, res) => {
        try {
            const usuarios = Array.isArray(req.body) ? req.body : [req.body];
            const resultados = [];

            for (let i = 0; i < usuarios.length; i++) {
                const { apellido, nombre, dni, cuil, nacimiento, foto, direccion,barrio, cel, mail, cv, estudios, genero, tarea, organizacion, referente, estado, hijos, contrasena, rol } = usuarios[i];
                const usuarioExiste = await Usuario.findOne({ dni });

                if (usuarioExiste) {
                    resultados.push({ success: false, error: `El usuario con DNI '${dni}' ya está registrado`, response: null });
                } else {
                    const contraHasheada = bcryptjs.hashSync(contrasena, 10);
                    const nuevoUsuario = new Usuario({
                        apellido,
                        nombre,
                        dni,
                        cuil,
                        foto,
                        direccion,
                        barrio,
                        cel,
                        mail,
                        cv,
                        estudios,
                        nacimiento,
                        genero,
                        tarea,
                        organizacion,
                        referente,
                        estado,
                        hijos,
                        contrasena: contraHasheada,
                        rol,
                    });
                    const token = jwt.sign({ ...nuevoUsuario }, process.env.SECRETO);
                    await nuevoUsuario.save();
                    const email = nuevoUsuario.mail; 
                    const correo = "achamariamacarena@gmail.com"; 
                    const result = await transporter.sendMail({
                        from: `Admin Mail ${correo}`,
                        to: email,
                        subject: "Registro exitoso",
                        text: "¡Gracias por registrarte en nuestra aplicación!"
                    });
                    resultados.push({ success: true, response: { nuevoUsuario, token }, error: null });
                }
            }
            res.json(resultados);
        } catch (error) {
            console.error("Error al procesar usuarios:", error);
            res.status(500).json({ success: false, response: null, error: "Error en el servidor" });
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
            return res.json({ success: false, response: null, error: "Error en el servidor" });
        }
    },
    editarUsuario: async (req, res) => {
        try {
            const nuevoUsuario = await Usuario.findOneAndUpdate(
                { _id: req.params.id },
                {
                apellido: req.body.apellido,
                nombre: req.body.nombre,
                dni: req.body.dni,
                cuil: req.body.cuil,
                nacimiento: req.body.nacimiento,
                foto: req.body.foto,
                direccion: req.body.direccion,
                cel: req.body.cel,
                mail: req.body.mail,
                cv: req.body.cv,
                estudios: req.body.estudios,
                genero: req.body.genero,
                tarea: req.body.tarea,
                organizacion: req.body.organizacion,
                referente: req.body.referente,
                hijos: req.body.hijos,
                contrasena: req.body.contrasena,
                rol: req.body.rol
                },
                { new: true }
            );
            res.json({
                success: true,
                response: nuevoUsuario
            });
        } catch (e) {
            res.json({ success: false, error: e });
            console.error(e);
        }
    },
    editarEstado: async (req, res) => {
        try{
            actualizado = await Usuario.findOneAndUpdate({_id:req.params.id}, {estado: req.body.estado,}, {new:true})
        }catch(error){
            console.log(error)
        }
        res.json({success:actualizado ? true : false})
    },
    borrarUsuario: async (req,res)=>{
        const id = req.params.id
        try{
            await Usuario.findOneAndDelete({_id:id})
        }catch(error){
            console.log(error)
        }
        res.json({success: true, message: 'Usuario eliminado correctamente'})
    },
    filtrarUsuarios: async (req, res) => {
        try {
            const { filtro } = req.query;
            const usuariosFiltrados = await Usuario.find({
                $or: [
                    { nombre: { $regex: filtro, $options: 'i' } }, 
                    { apellido: { $regex: filtro, $options: 'i' } }, 
                    { dni: { $regex: filtro } },
                    { cuil: { $regex: filtro } },
                ],
            });
            res.json(usuariosFiltrados);
            } catch (error) {
            res.status(500).json({ error: 'Error al filtrar usuarios' });
        }
    },
    filtrarPorOrga: async (req, res) => {
        try {
            let usuario = await Usuario.find({ organizacion : req.params.organizacion});
            res.json({ res: usuario });
        } catch (err) {
            return res.status(400).json({
                message: "no se puede encontrar usuarios",
                res: err.message,
            });
        }
    }, 
    filtrarPorRef: async (req, res) => {
        try {
            let usuario = await Usuario.find({ referente : req.params.referente});
            res.json({ res: usuario });
        } catch (err) {
            return res.status(400).json({
                message: "no se puede encontrar usuarios",
                res: err.message,
            });
        }
    }, 
}

module.exports = usuariosController