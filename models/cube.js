// Id - number
// Name – string
// Description – string
// Image URL – string
// Difficulty Level– number

const fs = require('fs')
const path = require('path')
const { v4 } = require('uuid')
const dbFile = path.join(__dirname, '..', '/config/database.json')

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4()
        this.name = name
        this.description = description
        this.imageUrl = imageUrl
        this.difficulty = difficulty
    }

    save() {
        const data = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        }

        const json = JSON.stringify(data)

        fs.readFile(dbFile, (err, data) => {
            if (err) {
                console.log(err)
                return
            }

            const cubes = JSON.parse(data)

            cubes.push(json)

            fs.writeFile(dbFile, JSON.stringify(cubes), err => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log('New cube added successfully!')

            })

        })


    }
}

module.exports = Cube