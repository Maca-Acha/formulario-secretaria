const express = require("express")
const app = express()
const PORT = 4000

app.use(express.json())
app.use(require("./routs/routes"))

app.get("/", (req, res) => {
    res.send("Hola")
    })

app.listen(PORT, () =>
    console.log("Server listening on port " + PORT)
);
