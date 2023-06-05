const router = require ('express').Router()
const userController = require('../controllers/userController')
const controller = require("../controllers/archivosController")
const controllerFoto = require("../controllers/fotosController")

router.get("/", (req,res) => {
    res.send("funciona")
})
router.route("/api/usuarios")
.get(userController.readUsers)
.post(userController.newUser)

router.post(
    "/api/archivos",
    controller.uploadCv,
    controller.uploadFiles)

router.post(
    "/api/archivosFoto",
    controllerFoto.uploadFoto,
    controllerFoto.uploadFiles)

module.exports = router

