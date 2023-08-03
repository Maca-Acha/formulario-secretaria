const router = require ('express').Router()
const usuariosController = require('../controllers/usuariosController')
const usuariosLoteControllerModule = require('../controllers/usuariosLoteController');
const controllerCv = require("../controllers/archivosController")
const controllerFoto = require("../controllers/fotosController")
const serviciosControllers = require('../controllers/serviciosController')

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// USUARIOS
router.post("/api/upload", 
    upload.any("archivo"), 
    usuariosLoteControllerModule.leerExcel);
router.route("/api/usuarios")
    .get(usuariosController.verUsuarios)
    .post(usuariosController.nuevoUsuario)
router.route("/api/usuarios/filtrados")
    .get(usuariosController.filtrarUsuarios)
router.route("/api/usuarios/filtrados/:organizacion")
    .get(usuariosController.filtrarPorOrga)
router.route("/api/filtrados/:referente")
    .get(usuariosController.filtrarPorRef)
router.route("/usuario/:id")
    .get(usuariosController.traerUsuarios)
    .put(usuariosController.editarUsuario)
router.route("/api/inicio")
    .post(usuariosController.signIn)
router.route("/api/servicios/:usuarioId")
    .get(serviciosControllers.traerServiciosByUsuario)
    .post(serviciosControllers.postServicio)

// SERVICIOS
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

