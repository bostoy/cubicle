const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userScheme')
const config = require('../config/config')

const authService = require('../services/auth')
const isAuthenticated = require('../middleware/isAuthenticated')
const isLoggedIn = require('../middleware/isLoggedIn')
const { COOKIE_NAME } = config
const router = Router()

router.route('/login')
    .get(isLoggedIn, (req, res, next) => {
        res.render('login', {
            title: 'Login | Cubicle Workshop'
        })
    })
    .post(isLoggedIn, async (req, res, next) => {
        let { username, password } = req.body

        try {
            const authResult = await authService.login({ username, password })
            res.cookie(COOKIE_NAME, authResult.token)
            res.cookie("user_id", authResult.uid)
            res.redirect('/')
        } catch (error) {

            res.render('login', {
                title: 'Login | Cubicle',
                error,

            })
        }
    })


router.route('/register')
    .get(isLoggedIn, (req, res, next) => {
        res.render('register', {
            title: 'Register | Cubicle Workshop',
        })
    })
    .post(isLoggedIn, async (req, res, next) => {

        let { username, password, repeatPassword } = req.body
        const foundUser = await User.findOne({ username, }).lean()
        if (foundUser) {
            return res.render('register', { error: 'Username already in use' })
        }


        if (password !== repeatPassword) {
            return res.render('register', { error: 'Password missmatch!' })
        }

        try {
            authService.register(username, password)
            res.redirect('/auth/login')
        } catch (error) {
            res.render('register', { title: 'Register | Cubicle', error })
        }


    })

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(COOKIE_NAME)
    res.redirect('/')
})

module.exports = router
