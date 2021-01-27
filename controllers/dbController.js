const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://dbUser:dbUserPassword@cubicle.elfpv.mongodb.net/allCubes?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (err) => {
    console.error('Database conncetion error: ', err)
})

db.once('open', () => {
    console.log('Connected to the database...')
})
