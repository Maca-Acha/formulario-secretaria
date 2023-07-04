const router = require ('express').Router()
const userController = require('../controllers/userController')
const controllerCv = require("../controllers/archivosController")
const controllerFoto = require("../controllers/fotosController")
const serviciosController = require('../controllers/serviciosController')

router.route("/api/usuarios")
.get(userController.readUsers)
.post(userController.newUser)

router.route("/usuario/:id")
.get(userController.returnUser)
.put(userController.editUser)

router.route("/api/inicio")
.post(userController.signIn)

router.route("/api/servicios")
.get(serviciosController.traerTodosServicios)

router.route("/api/servicios/:id")
.get(serviciosController.traerServicio)
.delete(serviciosController.borrarServicio)
.put(serviciosController.editarServicio)

router.route("/api/servicios/:usuarioId")
.post(serviciosController.postServicio)
.get(serviciosController.traerServiciosByUsuario);


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

