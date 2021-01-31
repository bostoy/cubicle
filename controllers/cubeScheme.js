const mongoose = require('mongoose')

const CubeScheme = new mongoose.Schema({
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
    imgURL: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})

const Cube = mongoose.model('Cube', CubeScheme)


module.exports = Cube