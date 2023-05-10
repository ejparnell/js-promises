// node run-read-and-write.js somethingDifferent.json newHeros.json

// we can drop the .js when running JavaScript files with Node
// Because Node will assume all files it's give are JavaScript files

// when we require a file we are requiring an object
// module.exports = { key: value }
// const readAndWrite = {
//     readAndWrite,
//     readFile,
//     writeFile,
//     parseJson
// }
const readAndWrite = require('./index')

// module.exports = oneThing

// const oneThing = require('file location')
// oneThing = oneThing
// Why do I have a different run file from where my logic is?
// common pattern - intake user information in one place and check it
    // this is going to be inside this file
// Logic housed elsewhere

// process - object for Node
// argv - in taking commands from the command line

console.log(process.argv[3])

const inFile = process.argv[2]
const outFile = process.argv[3]

if (!inFile && !outFile) {
    console.log('Please give me an in file or an out file')
}

// readAndWrite.readAndWrite(inFile, outFile)

// Promise Chain
// kick off with a promise
// then using `.then`s and `.catch`s to handle the next step in the promise chain

readAndWrite
    .readFile(inFile)
    // if success hand off the resolution to the .then
    // .then((res) => {
    //     console.log(res)
    // })
    // .then(console.log)
    .then(readAndWrite.parseJson)
    // .then(res => {
    //     readAndWrite.parseJson(res)
    // })
    // If you need to pass more than 1 param to a callback function in a promises chain
    // you will need to name the response that is incoming  and pass it to the  function  along with the other item needed
    .then((res) => {
        readAndWrite.writeFile(outFile, res)
    })
    // why we need the callback function here is because what console.log is logging is different than what the response from the previous .then is
    .then(() => console.log('done'))
    // if failure hand off the error to the .catch
    .catch(err => console.error)