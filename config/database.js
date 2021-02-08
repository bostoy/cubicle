const mongoose = require('mongoose')
const config = require('./config')
mongoose.connect(config.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (err) => {
    console.error('Database conncetion error: ', err)
})

db.once('open', () => {
    console.log('Connected to the database...')
})



module.exports = db