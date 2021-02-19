const { Router } = require('express')
const jwt = require('jsonwebtoken')
const router = Router()
const Cube = require('../models/cubeScheme')
const Accessory = require('../models/accessoryScheme')
const isAuthenticated = require('../middleware/isAuthenticated')
const { SECRET } = require('../config/config')


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
        console.log(userToken)

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
    .get(isAuthenticated, async (req, res) => {
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