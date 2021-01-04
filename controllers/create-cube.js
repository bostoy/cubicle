const Cube = require('../models/cube')

const newCube = new Cube('default', 'this is a default cube', 'https://google.com', 1)
newCube.save()
