const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        require: true,
    },
    password: { //hashed passsword -> bcrypt
        type: String,
        require: true,

    }
})
const User = mongoose.model('User', AccessoryScheme)


module.exports = User