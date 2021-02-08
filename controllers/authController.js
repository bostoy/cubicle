const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const User = require('../models/userScheme')
const config = require('../config/config')

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
    .post(async (req, res, next) => {

        let { username, password, repeatPassword } = req.body

        if (!authService.validateRegister(username, password, repeatPassword)) {
            errorMessage = true
            res.render('register', {
                title: 'Register | Cubicle Workshop',
                error: true,
                errorMessage: 'Error creating new user',

            })
            return
        }
        authService.createUser(username, password)

        res.redirect('/')
    })

module.exports = router
