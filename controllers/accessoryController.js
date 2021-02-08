const { Router } = require('express')
const Accessory = require('../models/accessoryScheme')

const router = Router()

router.route('/create')
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



module.exports = router