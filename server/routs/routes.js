const router = require ('express').Router()
const userController = require('../controllers/userController')
const controller = require("../controllers/archivosController")

router.get("/", (req,res) => {
    res.send("funciona")
})
router.route("/api/usuarios")
.get(userController.readUsers)
.post(userController.newUser)

router.post(
    `/api/archivos`,
    controller.upload,
    controller.uploadFiles)

module.exports = router