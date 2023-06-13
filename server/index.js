require("dotenv").config() /* Revisar para que sirve*/
require("./config/database")

const express = require("express")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 4000 

app.use(express.json())
app.use(cors())
app.use(require("./routs/routes"))

app.get("/", (req, res) => {
    res.send("Hola")
    })

app.listen(PORT, () =>
    console.log("Server listening on port " + PORT)
);
