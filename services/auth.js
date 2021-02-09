const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/userScheme')
const config = require('../config/config')

function register(username, password) {
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

module.exports = {
    register,
}