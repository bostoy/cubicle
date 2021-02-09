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
        unique: true,
        required: true,
    },

})
const User = mongoose.model('User', userScheme)


module.exports = User