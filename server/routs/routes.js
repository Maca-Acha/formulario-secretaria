const router = require ('express').Router()
const userController = require('../controllers/userController')

router.get("/", (req,res) => {
    res.send("funciona")
})
router.route("/api/")
.get(userController.readUsers)

module.exports = router