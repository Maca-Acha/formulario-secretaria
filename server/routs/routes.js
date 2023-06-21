const router = require ('express').Router()
const userController = require('../controllers/userController')
const controllerCv = require("../controllers/archivosController")
const controllerFoto = require("../controllers/fotosController")

router.route("/api/usuarios")
.get(userController.readUsers)
.post(userController.newUser)

router.route("/api/inicio")
.post(userController.signIn)

router.post(
    "/api/archivos",
    controllerCv.uploadCv,
    controllerCv.uploadFiles)

/* router.get('/api/archivos', controllerCv.returnCvs); */

router.post(
    "/api/archivosFoto",
    controllerFoto.uploadFoto,
    controllerFoto.uploadFiles)



module.exports = router

