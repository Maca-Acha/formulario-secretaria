const router = require ('express').Router()
const userController = require('../controllers/userController')

router.get("/", (req,res) => {
    res.send("funciona")
})
router.route("/api/usuarios")
.get(userController.readUsers)
.post(userController.newUser)

module.exports = router