const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/userScheme')
const config = require('../config/config')

function createUser(username, password) {
    bcrypt.genSalt(config.SALT_ROUNDS, (err, salt) => {
        if (err) {
            console.log('Error generating salt', err)
        }
        bcrypt.hash(password, salt, (error, hash) => {
            if (error) {
                console.log('Error hashing the password', error)
            }
            const user = new User({ username, password: hash, salt, })
            user.save()
        })
    })
}
function validateRegister(username, password, repeatPassword) {
    return validateRegisterPasswords(password, repeatPassword) && availableUsername(username)
}
function validateRegisterPasswords(password, repeatPassword) {

    return password === repeatPassword
}
async function availableUsername(username) {
    try {
        let user = await User.findOne({ username, })

        if (user) {
            return false
        }
    } catch (err) {
        console.log('Error finding username in db', err)
        return
    }
    console.log('Username is available')
    return true
}

module.exports = {
    validateRegister,
    createUser,
}