const { Router } = require('express')
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

    })

module.exports = router
