const { json } = require('body-parser')
const fs = require('fs')

const readDB = function () {
    return JSON.parse(fs.readFileSync('./db/database.json'))
}


module.exports = {
    readDB
}
