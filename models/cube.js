const fs = require('fs')
const { v4: uuidv4 } = require('uuid')


class Cube {
    constructor(name, description, imgURL, difficulty) {
        if (name == "" || description == "" || imgURL == "" || difficulty == "") {
            if (Number(difficulty) < 0 || Number(difficulty) > 9) {
                console.log('Invalid Cube Difficulty')
                return
            }
            console.log("Invalid Cube data!")
            return
        }

        this.id = uuidv4()
        this.name = name
        this.description = description
        this.imgURL = imgURL
        this.difficulty = difficulty
    }

    save() {
        fs.readFile('./db/database.json', (err, data) => {
            if (err) {
                console.error('Error getting database information', err)
            }
            let dataArr = JSON.parse(data)
            dataArr.push(this)

            fs.writeFile('./db/database.json', JSON.stringify(dataArr), (error) => {
                if (error) {
                    console.error('Error writing cube to db', error)
                    return
                }
                console.log('Cube successfully added!')
            })
        })
    }
}

const q1 = new Cube('Eco-Dark', 'opisanie', 'https://thingsidesire.com/wp-content/uploads/2018/06/Eco-Dark-Rubik%E2%80%99s-Cube2.jpg', '6')
q1.save()