const express = require('express')
const routes = require('./routes/router')
const exphbs = require('express-handlebars')


const app = express()
const port = 3000

app.use(express.urlencoded({
    extended: true
}))

app.engine('.hbs', exphbs({
    defaultLayout: 'main'
    , extname: '.hbs'
}))
app.set('view engine', '.hbs')


app.use(express.static('static'))


app.use(routes)

app.listen(port, () => {
    console.log("Server listening on port: ", port)
})