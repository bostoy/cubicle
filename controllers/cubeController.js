const { Router } = require('express')
const jwt = require('jsonwebtoken')
const router = Router()
const Cube = require('../models/cubeScheme')
const Accessory = require('../models/accessoryScheme')
const { SECRET } = require('../config/config')
const isAuthenticated = require('../middleware/isAuthenticated')
const isCreator = require('../middleware/isCreator')


router.route('/create')
    .get(isAuthenticated, (req, res) => {
        res.render('create.hbs', {
            title: 'Create | Cubicle Workshop',
            isAuthenticated: req.cookies['USER_SESSION']

        })
    })
    .post(isAuthenticated, (req, res) => {
        const { name, description, imgURL, difficultyLevel } = req.body
        const userToken = req.cookies['USER_SESSION']

        try {
            const decoded = jwt.verify(userToken, SECRET)
            const cube = new Cube({
                name,
                difficulty: Number(difficultyLevel),
                imgURL,
                description,
                creator: decoded._id
            })

            cube.save()
            res.redirect('/')

        } catch (err) {
            console.log('JWT Decoding error', err)
        }
    })

router.route('/delete/:id')
    .get(isAuthenticated, isCreator, async (req, res) => {
        const id = req.params.id
        const { name, description, imgURL, difficulty } = await Cube.findById(id).lean()

        res.render('deleteCube', {
            title: 'Delete Cube | Cubicle',
            name: name,
            description: description,
            imgURL: imgURL,
            difficulty: difficulty,
            id,
        })
    })
    .post(isAuthenticated, isCreator, (req, res) => {
        Cube.deleteOne({ _id: req.params.id }, (err) => {
            if (err) {
                return console.log('Error deleting cube: ', err)
            }
            console.log('Cube deleted')
            res.redirect('/')
        })
    })

router.route('/edit/:id')
    .get(isAuthenticated, isCreator, async (req, res) => {
        const id = req.params.id
        const { name, description, imgURL, difficulty } = await Cube.findById(id).lean()

        res.render('editCube', {
            title: 'Edit Cube | Cubicle',
            name,
            description,
            imgURL,
            difficulty,
            id,
        })
    })
    .post(isAuthenticated, isCreator, (req, res) => {
        const id = req.params.id
        const { name, description, imageUrl, difficultyLevel } = req.body

        Cube.findByIdAndUpdate(id, { name, description, imgURL: imageUrl, difficulty: difficultyLevel }, (err) => {
            if (err) {
                return console.log('Error updating cube: ', err)
            }
            console.log('Cube updated')
            res.redirect('/')
        })
    })

router.route('/details/:id')
    .get(isAuthenticated, async (req, res) => {
        const id = req.params.id
        const userToken = req.cookies['USER_SESSION']
        let checkCreator = false
        const cube = await Cube.findById(id).populate('accessories').lean()
        const { _id } = jwt.verify(userToken, SECRET)

        if (cube.creator == _id) {
            checkCreator = true
        }


        res.render('details.hbs', {
            title: 'Details | Cubicle Workshop',
            imgURL: cube.imgURL,
            description: cube.description,
            difficulty: cube.difficulty,
            accessories: cube.accessories,
            id,
            isAuthenticated: req.cookies['USER_SESSION'],
            creator: checkCreator,
        })
    })

router.route('/attach/:id')
    .get(isAuthenticated, isCreator, async (req, res) => {
        const id = req.params.id

        const cube = await Cube.findById(id)
        const accessories = await Accessory.find({ _id: { $nin: cube.accessories } }).lean() // const result = accessories.filter(e => !cube.accessories.includes(e._id))

        res.render('attachAccessory', {
            imgURL: cube.imgURL,
            accessories,
            isAuthenticated: req.cookies['USER_SESSION']

        })
    })
    .post(isAuthenticated, async (req, res) => {
        const cube = await Cube.findById(req.params.id)
        const accessoryId = req.body.accessory

        cube.accessories.push(accessoryId)
        cube.save()
        res.redirect(`/details/${req.params.id}`)

    })


module.exports = router