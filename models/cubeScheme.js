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
        validate: /^https?/,
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Cube = mongoose.model('Cube', CubeScheme)


module.exports = Cube