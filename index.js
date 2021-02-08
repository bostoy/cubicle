const express = require('express')
const config = require('./config/config')
const routes = require('./routes/router')
const exphbs = require('express-handlebars')


const app = express()

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

app.listen(config.PORT, () => {
    console.log("Server listening on port: ", config.PORT)
})