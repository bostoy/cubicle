const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://dbUser:dbUserPassword@cubicle.elfpv.mongodb.net/allCubes?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (err) => {
    console.error('Database conncetion error: ', err)
})

db.once('open', () => {
    console.log('Connected to the database...')
})

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        min: 1,
        max: 6,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})

const Cube = mongoose.model('Cube', CubeSchema)

module.exports = Cube