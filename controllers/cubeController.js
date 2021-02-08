const { Router } = require('express')
const router = Router()
const Cube = require('../models/cubeScheme')
const Accessory = require('../models/accessoryScheme')


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

router.route('/attach/:id')
    .get(async (req, res) => {
        const id = req.params.id
        const cube = await Cube.findById(id)
        const accessories = await Accessory.find({ _id: { $nin: cube.accessories } }).lean() // const result = accessories.filter(e => !cube.accessories.includes(e._id))

        res.render('attachAccessory', {
            imgURL: cube.imgURL,
            accessories
        })
    })
    .post(async (req, res) => {
        const cube = await Cube.findById(req.params.id)
        const accessoryId = req.body.accessory

        cube.accessories.push(accessoryId)
        cube.save()
        res.redirect(`/details/${req.params.id}`)

    })


module.exports = router