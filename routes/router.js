const express = require('express')
const router = express.Router()

router.route('/')
    .get((req, res, next) => {
        res.send('Home Page')
    })

router.route('/about')
    .get((req, res, next) => {
        res.send('About Page')
    })

router.route('/create')
    .get((req, res, next) => {
        res.send('Create Page')
    })

router.route('/details/:id')
    .get((req, res, next) => {
        res.send('Details Page')
    })

router.route('*')
    .all((req, res) => {
        res.send('Error Page')
    })
module.exports = router