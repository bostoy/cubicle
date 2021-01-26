const { json } = require('body-parser')
const fs = require('fs')

const readDB = function () {
    return JSON.parse(fs.readFileSync('./db/database.json'))
}
const searchDB = function (name, difficultyFrom, difficultyTo) {
    const resultArr = []
    const db = readDB()

    db.forEach(cube => {
        if (cube.name.includes(name) && Number(cube.difficulty) >= Number(difficultyFrom) && Number(cube.difficulty) <= Number(difficultyTo)) {
            resultArr.push(cube)
        }
    });

    return resultArr
}

searchDB('Eco', '0', '9')

module.exports = {
    readDB,
    searchDB,

}
