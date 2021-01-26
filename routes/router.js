const express = require('express')
const dbController = require('../controllers/dbController')
const router = express.Router()
const Cube = require('../models/cube')


router.route('/')
    .get((req, res) => {

        const cubesArr = dbController.readDB()

        res.render('index.hbs', {
            title: 'Home | Cubicle Workshop',
            cubes: cubesArr
        })
    })
    .post((req, res) => {
        const { search, from, to } = req.body

        const cubesArr = dbController.searchDB(search, from, to)

        res.render('index.hbs', {
            title: 'Home | Cubicle Workshop',
            cubes: cubesArr
        })
    })

router.route('/about')
    .get((req, res) => {
        res.render('about.hbs', {
            title: 'About | Cubicle Workshop'
        })
    })

router.route('/create')
    .get((req, res) => {
        res.render('create.hbs', {
            title: 'Create | Cubicle Workshop'
        })
    })
    .post((req, res) => {
        const { name, description, imageUrl, difficultyLevel } = req.body
        const cube = new Cube(name, description, imageUrl, difficultyLevel)
        cube.save()
        res.redirect('/')
    })

router.route('/details/:id')
    .get((req, res) => {

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