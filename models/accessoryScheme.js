const mongoose = require('mongoose')

const AccessoryScheme = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    imgURL: {
        type: String,
        required: true,
        validate: /^https?/
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    cubes: {
        type: mongoose.Types.ObjectId,
        ref: 'Cube'
    }
})

const Accessory = mongoose.model('Accessory', AccessoryScheme)


module.exports = Accessory