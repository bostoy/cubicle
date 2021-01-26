const express = require('express')
const dbController = require('../controllers/dbController')
const router = express.Router()

const cubesArr = dbController.readDB()

router.route('/')
    .get((req, res, next) => {

        res.render('index.hbs', {
            title: 'Home | Cubicle Workshop',
            cubes: cubesArr
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

        const id = req.params.id

        const foundCube = cubesArr.find(cube => cube.id == id)

        res.render('details.hbs', {
            title: "Details | Cubicle Workshop",
            imgURL: foundCube.imgURL,
            description: foundCube.description,
            difficulty: foundCube.difficulty
        })
    })

router.route('*')
    .all((req, res) => {
        res.render('404.hbs', {
            title: 'Error | Cubicle Workshop'
        })
    })
module.exports = router