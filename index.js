const express = require('express')
const routes = require('./routes/router')



const app = express()
const port = 3000

app.use(routes)

app.listen(port, () => {
    console.log("Server listening on port: ", port)
})