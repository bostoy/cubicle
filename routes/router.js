const express = require('express')
const router = express.Router()

router.route('/')
    .get((req, res, next) => {
        res.render('index.hbs')
    })

router.route('/about')
    .get((req, res, next) => {
        res.render('about.hbs')
    })

router.route('/create')
    .get((req, res, next) => {
        res.render('create.hbs')
    })

router.route('/details/:id')
    .get((req, res, next) => {
        res.render('details.hbs')
    })

router.route('*')
    .all((req, res) => {
        res.render('404.hbs')
    })
module.exports = router