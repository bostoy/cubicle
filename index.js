const express = require('express')
const home = require('./routes/index')

const app = express()
const port = 3000
app.use('/', home)

app.listen(port, () => {
    console.log("Server listening on port: ", port)
})