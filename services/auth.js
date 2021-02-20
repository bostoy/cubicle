const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

async function login({ username, password }) {
    const user = await User.findOne({ username })
    if (!user) throw { message: 'Invalid username or password!' }

    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw { message: 'Invalid username or password!' }

    let token = jwt.sign({ _id: user._id, roles: ['admin'] }, config.SECRET)

    return token


}


module.exports = {
    register,
    login,

}