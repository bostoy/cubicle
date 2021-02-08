const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const User = require('../models/userScheme')
const saltRounds = require('../config/config').SALT_ROUNDS

const authService = require('../services/auth')

const router = Router()

router.route('/login')
    .get((req, res, next) => {
        res.render('login', {
            title: 'Login | Cubicle Workshop'
        })
    })
    .post((req, res, next) => {

    })


router.route('/register')
    .get((req, res, next) => {
        res.render('register', {
            title: 'Register | Cubicle Workshop'
        })
    })
    .post((req, res, next) => {
        const { username, password, repeatPassword } = req.body
        username = username.toLowerCase()

        if (!authService.validateRegister(username, password, repeatPassword)) {
            res.redirect('/auth/register')
            return
        }
        authService.createUser(username, password)


    })

module.exports = router
