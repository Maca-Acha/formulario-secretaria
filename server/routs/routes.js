const router = require ('express').Router()

router.get("/api", (req,res) => {
    res.send("api funciona")
})

module.exports = router