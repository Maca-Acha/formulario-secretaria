const mongoose = require("mongoose")

const URI = process.env.MONGODB_URI 

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate: true
})

.then (()=> console.log('Database connected'))
.catch(err => console.error('Error connecting to the database:', err))


