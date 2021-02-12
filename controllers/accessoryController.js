const { Router } = require('express')
const Accessory = require('../models/accessoryScheme')
const isAuthenticated = require('../middleware/isAuthenticated')

const router = Router()

router.route('/create')
    .get(isAuthenticated, (req, res) => {
        res.render('createAccessory.hbs', {
            title: 'Create Accessory | Cubicle Workshop',
            isAuthenticated: req.cookies['USER_SESSION']

        })
    })
    .post(isAuthenticated, (req, res) => {
        const { name, description, imgURL } = req.body

        const accessory = new Accessory({
            name,
            description,
            imgURL
        })
        accessory.save()
        res.redirect('/')
    })



module.exports = router