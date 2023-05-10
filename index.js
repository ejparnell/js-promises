// If I would like to work with the file system I need to import it
const fs = require('fs')

// fs.writeFile - write a file
// 1st param - path to file that we want to write to
// 2nd param - what we are writing to the file
// 3rd param - callback function, intakes an error if it happens. This is also how we are going to handle the writeFile
// fs.writeFile('./file.txt', 'Hello world', err => {
//     // checking if an error happened BEFORE I'm running any other logic
//     // If an error happens exit early because there is no reason for us to be here any longer
//     if (err) {
//         // like a console.log but for errors
//         // can also just use console.log here too
//         console.error(err)
//     } else {
//         // console.log done because if successful writeFile will not give us feedback
//         console.log('done')
//     }
// })

// fs.readFile - reading a file from our file system
// 1st param - file that we will read from
// 2nd param - utf8 is what the file should be read as. If this is not provide file will come back as something called a buffer
// 3rd param - callback function on how to handle this readFile, error and data in that order
// fs.readFile('./file.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err)
//     } else {
//         console.log(data)
//     }
// })

const readAndWrite = (inFile, outFile) => {
    fs.readFile(inFile, 'utf8', (err, data) => {
			if (err) {
				console.error(err)
			}
			// since this heros.json file is json this data is a string not an object even though it looks like one
			console.log(typeof data)
			// To change JSON into an object call parse on that json
			// POJO - Plain old JavaScript object
			const heroPojo = JSON.parse(data)

			heroPojo.something = 'else'
			console.log(heroPojo)

			// 1st param - the object I want to turn into JSON
			// 2nd param - I forget, butttt if you would like to jump over a param in a function pass in `null` as a value
			// 3rd param - how many indentations I would like to have in my json object
			const herosJson = JSON.stringify(heroPojo, null, 2)

			console.log(herosJson)

			fs.writeFile(outFile, herosJson, (err) => {
				if (err) {
					console.log(err)
				} else {
					console.log('done')
				}
			})
		})
}

// In JS if a function does not return anything it always return undefined
const readFile = (inFile) => {
	// because it take time to read from a file we need to start off with a promises
	return new Promise((resolve, reject) => {
		fs.readFile(inFile, 'utf8', (err, data) => {
			// instead of console.error we reject if an error has happened
			// if there is an error this mean that the error with go directly to the .catch
			if (err) {
				reject(err)
			} else {
				// instead of console.logging we send the data to the next .then
				resolve(data)
			}
		})
	})
}

const writeFile = (outFile, json) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(outFile, json, err => {
            if (err) {
                reject(err)
            } else {
                resolve(json)
            }
        })
    })
}

const parseJson = (json) => {
    const heroPojo = JSON.parse(json)
    const herosJson = JSON.stringify(heroPojo, null, 2)

    return herosJson
}

module.exports = {
    readAndWrite,
    readFile,
    writeFile,
    parseJson
}
