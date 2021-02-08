const mongoose = require('mongoose')
const { stringify } = require('uuid')

const userScheme = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    password: { //hashed passsword -> bcrypt
        type: String,
        required: true,
    },
    salt: {
        type: String,
    }
})
const User = mongoose.model('User', userScheme)


module.exports = User