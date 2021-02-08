const express = require('express')
const router = express.Router()
const Schema = require('mongoose').Schema
const Cube = require('../models/cubeScheme')
const Accessory = require('../models/accessoryScheme')
const db = require('../config/database')

const cubeController = require('../controllers/cubeController')
const accessoryController = require('../controllers/accessoryController')
const authController = require('../controllers/authController')

router.use('/cube', cubeController)
router.use('/accessory', accessoryController)
router.use('/auth', authController)

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

router.route('*')
    .all((req, res) => {
        res.render('404.hbs', {
            title: 'Error | Cubicle Workshop'
        })
    })
module.exports = router