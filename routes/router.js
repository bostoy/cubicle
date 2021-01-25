const express = require('express')
const router = express.Router()

router.route('/')
    .get((req, res, next) => {
        res.render('index.hbs', {
            title: 'Home | Cubicle Workshop'
        })
    })

router.route('/about')
    .get((req, res, next) => {
        res.render('about.hbs', {
            title: 'About | Cubicle Workshop'
        })
    })

router.route('/create')
    .get((req, res, next) => {
        res.render('create.hbs', {
            title: 'Create | Cubicle Workshop'
        })
    })

router.route('/details/:id')
    .get((req, res, next) => {
        res.render('details.hbs', {
            title: "Details | Cubicle Workshop"
        })
    })

router.route('*')
    .all((req, res) => {
        res.render('404.hbs', {
            title: 'Error | Cubicle Workshop'
        })
    })
module.exports = router