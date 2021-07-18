const fs = require('fs')
const pokers = require('./poker.js')
fs.readFile('LJ-poker.txt', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  pokers.readText(data.toString())
})