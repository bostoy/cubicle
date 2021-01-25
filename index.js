const express = require('express')
const routes = require('./routes/router')
const exphbs = require('express-handlebars')


const app = express()
const port = 3000

//set view engine
app.engine('.hbs', exphbs({
    defaultLayout: 'main'
    , extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use(routes)

app.listen(port, () => {
    console.log("Server listening on port: ", port)
})