const express = require('express')
const router = express.Router()
const Schema = require('mongoose').Schema
const Cube = require('../models/cubeScheme')
const Accessory = require('../models/accessoryScheme')
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
        const { name, description, imgURL, difficultyLevel } = req.body

        const cube = new Cube({
            name,
            difficulty: Number(difficultyLevel),
            imgURL,
            description,
        })

        cube.save()
        res.redirect('/')
    })

router.route('/details/:id')
    .get(async (req, res) => {

        const id = req.params.id
        const cube = await Cube.findById(id).lean().populate('accessories').lean()

        res.render('details.hbs', {
            title: 'Details | Cubicle Workshop',
            imgURL: cube.imgURL,
            description: cube.description,
            difficulty: cube.difficulty,
            accessories: cube.accessories

        })
    })

router.route('/create/accessory/')
    .get((req, res) => {
        res.render('createAccessory.hbs', {
            title: 'Create Accessory | Cubicle Workshop'
        })
    })
    .post((req, res) => {
        const { name, description, imgURL } = req.body

        const accessory = new Accessory({
            name,
            description,
            imgURL
        })
        accessory.save()
        res.redirect('/')
    })

router.route('/:id/attach')
    .get(async (req, res) => {
        const id = req.params.id
        const cube = await Cube.findById(id)
        const accessories = await Accessory.find({}).lean()

        res.render('attachAccessory', {
            imgURL: cube.imgURL,
            accessories,
        })
    })
    .post(async (req, res) => {
        const cube = await Cube.findById(req.params.id)
        const accessoryId = req.body.accessory

        cube.accessories.push(accessoryId)
        cube.save()
        res.redirect(`/details/${req.params.id}`)

    })

router.route('*')
    .all((req, res) => {
        res.render('404.hbs', {
            title: 'Error | Cubicle Workshop'
        })
    })
module.exports = router