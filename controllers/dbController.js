const { json } = require('body-parser')
const fs = require('fs')

const readDB = function () {
    return JSON.parse(fs.readFileSync('./db/database.json'))
}
const searchDB = function (name, difficultyFrom, difficultyTo) {
    const resultArr = []
    const db = readDB()

    if (!name && !difficultyFrom && !difficultyTo) {
        return db
    } else {
        db.forEach(cube => {
            if (cube.name.toUpperCase().includes(name.toUpperCase()) && Number(cube.difficulty) >= Number(difficultyFrom) && Number(cube.difficulty) <= Number(difficultyTo)) {
                resultArr.push(cube)
            }
        });
        return resultArr
    }
}

module.exports = {
    readDB,
    searchDB,

}
