const router = require ('express').Router()
const userController = require('../controllers/userController')
const controllerCv = require("../controllers/archivosController")
const controllerFoto = require("../controllers/fotosController")

router.route("/api/usuarios")
.get(userController.readUsers)
.post(userController.newUser)

router.post(
    "/api/archivos",
    controllerCv.uploadCv,
    controllerCv.uploadFiles)

router.get("/api/archivos", (req,res) => {
        res.send("funciona")
    })

router.post(
    "/api/archivosFoto",
    controllerFoto.uploadFoto,
    controllerFoto.uploadFiles)


module.exports = router

