const express = require('express')
const router = express.Router()
const Schema = require('mongoose').Schema
const Cube = require('../controllers/cubeScheme')
const db = require('../controllers/database')


router.route('/')
    .get(async (req, res) => {
        const filter = {}
        const cubes = await Cube.find(filter).lean()

        res.render('index.hbs', {
            title: 'Home | Cubicle Workshop',
            cubes,
        })
    })
    .post(async (req, res) => {
        const { search, from, to } = req.body

        const conditions = {
            name: { "$regex": search, "$options": "i" },
            difficulty: {
                $gte: from,
                $lte: to
            }
        }
        const cubes = await Cube.find(conditions).lean()

        res.render('index.hbs', {
            title: 'Home | Cubicle Workshop',
            cubes,
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

        const cube = new Cube({
            name,
            difficulty: Number(difficultyLevel),
            imgURL: imageUrl,
            description,
        })

        cube.save()
        res.redirect('/')
    })

router.route('/details/:id')
    .get(async (req, res) => {

        const id = req.params.id
        const cube = await Cube.findById(id)

        res.render('details.hbs', {
            title: "Details | Cubicle Workshop",
            imgURL: cube.imgURL,
            description: cube.description,
            difficulty: cube.difficulty
        })
    })

router.route('*')
    .all((req, res) => {
        res.render('404.hbs', {
            title: 'Error | Cubicle Workshop'
        })
    })
module.exports = router