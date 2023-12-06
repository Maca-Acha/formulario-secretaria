const router = require ('express').Router()
const usuariosController = require('../controllers/usuariosController')
const usuariosLoteControllerModule = require('../controllers/usuariosLoteController');
const controllerCv = require("../controllers/archivosController")
const controllerFoto = require("../controllers/fotosController")
const serviciosControllers = require('../controllers/serviciosController')
const transporter = require('../config/mailer')

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// USUARIOS
router.post("/api/upload", 
    upload.any("archivo"), 
    usuariosLoteControllerModule.leerExcel);
router.route("/api/usuarios")
    .get(usuariosController.verUsuarios)
    .post(usuariosController.nuevosUsuario)
router.route("/usuario/estado/:id")
    .put(usuariosController.editarEstado)
router.route("/usuario/:id")
    .get(usuariosController.traerUsuarios)
    .put(usuariosController.editarUsuario)
    .delete(usuariosController.borrarUsuario)
router.route("/api/inicio")
    .post(usuariosController.signIn)
router.post("/api/usuarios/login/:email/code", async (req, res) => {
    const email = req.params.email; 
    const mail = "achamariamacarena@gmail.com"
    const result = await transporter.sendMail({
        from: `Mail institucional ${mail}`,
        to: email, 
        subject: "prueba email",
        text: "Código" 
    });

    console.log({ result });
    res.status(200).json({ ok: true, message: "Código enviado con éxito!" });
});

// MENSAJE
router.route("/mensaje/usuarios")
    .post(usuariosController.enviarMensaje)

// FILTROS
router.route("/api/filtrados")
    .get(usuariosController.filtro)

// SERVICIOS
router.put('/api/servicios/:usuarioId', usuariosController.postServicio)
router.route("/api/servicios/:usuarioId")
    .get(serviciosControllers.traerServiciosByUsuario)
    .post(serviciosControllers.postServicio)
router.route("/api/servicios")
    .get(serviciosControllers.traerTodosServicios)
router.route("/api/servicios/:id")
    .get(serviciosControllers.traerServicio)
    .delete(serviciosControllers.borrarServicio)
    .put(serviciosControllers.editarServicio)

// ARCHIVOS
/* router.get('/api/archivos', controllerCv.returnCvs); */
router.post(
    "/api/archivos",
    controllerCv.uploadCv,
    controllerCv.uploadFiles)
router.post(
    "/api/archivosFoto",
    controllerFoto.uploadFoto,
    controllerFoto.uploadFiles)

module.exports = router

