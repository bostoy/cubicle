const jwt = require('jsonwebtoken')
const Cube = require('../models/cubeScheme')
const { SECRET } = require('../config/config')

module.exports = async (req, res, next) => {
    const userToken = req.cookies['USER_SESSION']
    const cubeID = req.params.id
    try {
        const { _id } = jwt.verify(userToken, SECRET)
        const cube = await Cube.findById(cubeID).lean()
        if (cube.creator == _id) {
            next()
        } else {
            res.redirect('/')
        }
    } catch (err) {
        console.log('Error verifying the user: ', err)
        res.redirect('/')
    }
}