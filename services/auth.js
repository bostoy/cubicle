const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/userScheme')
const saltRounds = require('../config/config').SALT_ROUNDS

function createUser(username, password) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            console.log('Error generating salt', err)
        }
        bcrypt.hash(password, salt, (error, hash) => {
            if (error) {
                console.log('Error hashing the password', error)
            }
            const user = new User({ username, password: hash, salt, })
            user.save()
            console.log('User succesfully created')
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
        const user = User.findOne({ username, })

        if (user) {
            console.log('Username is not available');
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