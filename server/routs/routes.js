const router = require ('express').Router()
const userController = require('../controllers/userController')
const controllerCv = require("../controllers/archivosController")
const controllerFoto = require("../controllers/fotosController")
const serviciosControllers = require('../controllers/serviciosController')

router.route("/api/usuarios")
.get(userController.readUsers)
.post(userController.newUser)

router.route("/usuario/:id")
.get(userController.returnUser)
.put(userController.editUser)

router.route("/api/inicio")
.post(userController.signIn)

router.route("/api/servicios/:usuarioId")
.get(serviciosControllers.traerServiciosByUsuario)
.post(serviciosControllers.postServicio)

router.route("/api/servicios")
.get(serviciosControllers.traerTodosServicios)

router.route("/api/servicios/:id")
.get(serviciosControllers.traerServicio)
.delete(serviciosControllers.borrarServicio)
.put(serviciosControllers.editarServicio)


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

