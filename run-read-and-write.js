// node run-read-and-write.js somethingDifferent.json newHeros.json

// we can drop the .js when running JavaScript files with Node
// Because Node will assume all files it's give are JavaScript files
const readAndWrite = require('./index')
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

readAndWrite.readAndWrite(inFile, outFile)