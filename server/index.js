require("dotenv").config() 
require("./config/database")
const express = require("express")
const cors = require("cors")
const app = express()
const path = require('path');
const PORT = process.env.PORT || 4000 

app.use(express.json())
app.use(cors());
app.use(require("./routs/routes"));

app.use(express.static("../front/dist"))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../front/dist/index.html"))
})

app.listen(PORT, () =>
    console.log("Server listening on port " + PORT)
);
